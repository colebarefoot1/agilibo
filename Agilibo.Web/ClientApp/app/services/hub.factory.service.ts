import { HubConnection } from "@aspnet/signalr";
import { AppConfig } from "../../AppConfig";
import * as signalR from "@aspnet/signalr";
import { Injectable } from "@angular/core";
import { Sprint } from "../models/Sprint";

let _hubInstance: HubFactory = null;


export class HubFactory {

    public _hubConnection: any;
    public readonly pockerApiUrl = 'http://89.145.160.220:9001/playpocker';

    constructor() {
        //this._hubConnection = new HubConnection('/playpocker');

        this._hubConnection = new HubConnection(this.pockerApiUrl, { transport: signalR.TransportType.WebSockets });
        this._hubConnection.serverTimeoutInMilliseconds = 100000; // 100 second

        this._hubConnection.start()
            .then(() => {
                console.log('Hub connection started:', this._hubConnection.connection.connectionId)
            })
            .catch(() => {
                console.log('Error while establishing connection')
            });
    }

    public CreateOrJoin(groupKey: string, email: string): void {

        //this._hubConnection.invoke('CreateOrJoin', groupKey, email);
        //start a conenct
        if (this._hubConnection.connection.connectionState === 1) {
            this._hubConnection.invoke('CreateOrJoin', groupKey, email);
        }
        else {
            console.log('Hub is not connected. restarting...');
            this._hubConnection.start()
                .then(() => {
                    this.CreateOrJoin(groupKey, email);
                })
                .catch(() => {
                    console.log('Error while establishing connection (restart)')
                });
        }
    }

    public selectName(groupKey: string, sprintKey: string, email: string): void {
        this._hubConnection.invoke('SprintGoal', groupKey, sprintKey, email);
    }

    public selectNameFromWoner(groupKey: string, sprintKey: string, email: string): void {
        this._hubConnection.invoke('SprintGoal', groupKey, sprintKey, email);
    }

    public start(groupMessage: string, groupKey: string): void {
        this._hubConnection.invoke('Start', groupMessage, groupKey);
    }

    public fiboVote(currentFiboId: string, email: string): void {
        this._hubConnection.invoke('FiboVote', currentFiboId, email);
    }

    public ShowVote(currentFiboId: string): void {
        this._hubConnection.invoke('FiboVote', currentFiboId);
    }

    public showAllVote(groupKey: string, email: string): void {
        this._hubConnection.invoke('ShowVote', groupKey, email);
    }

    public clearVote(groupKey: string, email: string): void {
        this._hubConnection.invoke('ClearVote', groupKey, email);
    }

    public close(groupKey: string, email: string): void {
        this._hubConnection.invoke('Stop', groupKey, email);
    }

    public Destroy(groupKey: string, email: string): void {
        this._hubConnection.invoke('DistroyPage', groupKey, email);
    }
}

const getHub = () => {

    if (!_hubInstance) {
        _hubInstance = new HubFactory();
    }

    return _hubInstance;
}


export const myPockerHub = {
    hub: getHub,
}




