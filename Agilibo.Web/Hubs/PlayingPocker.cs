using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Agilibo.Web.Hubs
{
    public class PlayingPocker : Hub
    {
        private static List<PockerGroup> _groups = new List<PockerGroup>();

        //private const string WebServiceUrl = "http://localhost:11338/";
        private const string WebServiceUrl = "http://89.145.160.220:9001";

        private const string ApiKey = "37629CDA-E0F0-49D3-9B86-EB5F2BB200AB";

        /// <summary>
        /// If any error occur on connection, signal r will auto disconnect
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (_groups.Any(g => g.Owner == Context.ConnectionId))
            {
                var gs = _groups.Where(g => g.Owner == Context.ConnectionId).ToList();

                foreach (var group in gs)
                {
                    await BroadcastGroup(group, true);
                    _groups.Remove(group);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }


        /// <summary>
        /// When a user want to join the team then it will create a new session or 
        /// Update the existing session's member information.
        /// If the memeber is new then it will add new memeber
        /// If the member already exist in to this session then it will update the session member connection id
        /// </summary>
        /// <param name="key"></param>
        /// <param name="emailName"></param>
        public async Task CreateOrJoin(string key, string emailName)
        {

            

            var group = _groups.FirstOrDefault(g => g.Key == key);

            if (group == null)
            {
                //Calling Core API Service  for setup data
                string url = @"api/V1/PlanningPocker/GetEstimateSettingByTeamId/" + key + "/" + ApiKey + "";

                var httpClient = new HttpClient();
                var json = await httpClient.GetStringAsync(WebServiceUrl + url);
                var planningPockerViewModel = JsonConvert.DeserializeObject<PlanningPockerViewModel>(json);


                group = new PockerGroup { Key = key, Owner = Context.ConnectionId };

                group.FiboNakkiCards = new List<PockerCard>();
                group.FiboNakkiCards = planningPockerViewModel.FiboNakkiCards;
                //foreach (var item in group.FiboNakkiCards)
                //{
                //    item.ConnectionId = Context.ConnectionId;
                //}
                // Setting sprint list for the team
                group.SprintList = new List<SprintViewModel>();
                group.SprintList = planningPockerViewModel.SprintList;

                // Add New Group
                group = new PockerGroup { Key = key, Owner = Context.ConnectionId };
                // Add group in to master session
                _groups.Add(group);

                // Add this requested member in to this new group
                group.Glasses.Add(new PockerPlayer { ConnectionId = Context.ConnectionId, EmailName = emailName });
            }
            else
            {
                //group.FiboNakkiCards = new List<PockerCard>();
                //group.FiboNakkiCards = planningPockerViewModel.FiboNakkiCards;
                //foreach (var item in group.FiboNakkiCards)
                //{
                //    item.ConnectionId = Context.ConnectionId;
                //}
                // Setting sprint list for the team
                //group.SprintList = new List<SprintViewModel>();
                //group.SprintList = planningPockerViewModel.SprintList;
                // Checking this member already exist in to the group or not
                var groupMember = group.Glasses.FirstOrDefault(m => m.EmailName == emailName && m.ConnectionId == Context.ConnectionId);

                // Member is not exist in to this group
                if (groupMember == null)
                {
                    group.Glasses.Add(new PockerPlayer { ConnectionId = Context.ConnectionId, EmailName = emailName });
                }
                else
                {
                    group.Glasses.Remove(groupMember); // removing existing connection and creating new connection member

                    group.Glasses.Add(new PockerPlayer { ConnectionId = Context.ConnectionId, EmailName = emailName });
                }
            }

            await BroadcastGroup(group);
        }


        public async Task DistroyPage(string key, string emailName)
        {
            var group = _groups.FirstOrDefault(g => g.Key == key);

            if (group != null)
            {
                var groupMember = group.Glasses.FirstOrDefault(m => m.EmailName == emailName && m.ConnectionId == Context.ConnectionId);

                if (groupMember != null)
                {
                    group.Glasses.Remove(groupMember);
                }
                await BroadcastGroup(group);
            }


        }

        /// <summary>
        /// If any member want to leave his current session
        /// </summary>
        /// <param name="key"></param>
        /// <param name="emailName"></param>
        public async Task Stop(string key, string emailName)
        {
            var group = _groups.FirstOrDefault(g => g.Key == key);
            if (group == null)
            {
                var groupMember = group.Glasses.FirstOrDefault(m => m.EmailName == emailName && m.ConnectionId == Context.ConnectionId);

                if (groupMember != null)
                {
                    group.Glasses.Remove(groupMember);
                    await BroadcastGroup(group);
                }
            }
        }

        /// <summary>
        /// If any member click on show vote, It will show vote for all other member
        /// </summary>
        /// <param name="key"></param>
        /// <param name="emailName"></param>
        public async Task ShowVote(string key, string emailName)
        {
            var group = _groups.FirstOrDefault(g => g.Key == key);

            if (group != null)
            {
                foreach (var glass in group.Glasses)
                {
                    glass.ShowVoted = true;
                }
            }

            await BroadcastGroup(group);
        }

        /// <summary>
        /// If team member want to create a new user story then they will click clear vote
        /// this will enable for new user story
        /// this will clear all vote
        /// </summary>
        /// <param name="key"></param>
        /// <param name="emailName"></param>
        public async Task ClearVote(string key, string emailName)
        {
            var group = _groups.FirstOrDefault(g => g.Key == key);
            if (group != null)
            {
                group.GroupMessage = string.Empty;
                group.HasGroupMessage = false;
                group.HasStarted = false;

                foreach (var glass in group.Glasses)
                {
                    glass.FiboVote = string.Empty;
                    glass.HasVoted = false;
                    glass.ShowVoted = false;
                }
            }

            await BroadcastGroup(group);
        }

        public async Task SprintGoal(string key, string sprintKey, string email)
        {
            if (sprintKey == null)
            {
                await Task.FromResult(true);
            }

            var id = Context.ConnectionId;
            Guid skey = new Guid(sprintKey);
            var group = _groups.FirstOrDefault(g => g.Key == key);

            if (group != null)
            {
                foreach (var sprint in group.SprintList.Where(m => m.SprintKey == skey))
                {
                    group.SprintName = sprint.SprintName;
                    group.SprintGoal = sprint.SprintGoal;
                    group.SprintKey = sprint.SprintKey.ToString();
                }

                group.SprintIndex = group.SprintList.FindIndex(a => a.SprintKey == skey);
            }

            group.Owner = Context.ConnectionId;

            group.SprintOwnerName = email;

            await BroadcastGroup(group);
        }

        public async Task Start(string groupMessage, string groupKey)
        {
            var group = _groups.FirstOrDefault(g => !g.HasFinished && !g.HasStarted && g.Key == groupKey);

            if (group != null)
            {
                group.HasStarted = true;
                group.GroupMessage = groupMessage;
                group.HasGroupMessage = true;
                await BroadcastGroup(group);
            }
        }

        /// <summary>
        /// When any team member will give his vote this method will update his vote status
        /// </summary>
        /// <param name="currentFiboId"></param>
        /// <param name="emailName"></param>
        public async Task FiboVote(string currentFiboId, string emailName)
        {
            var group = _groups.FirstOrDefault(g => g.Glasses.Any(gl => gl.EmailName == emailName));

            if (group != null)
            {
                if (group.HasGroupMessage)
                {
                    var glass = group.Glasses.First(g => g.ConnectionId == Context.ConnectionId);
                    glass.FiboVote = currentFiboId;
                    glass.HasVoted = true;
                    await BroadcastGroup(group);
                }

            }
        }

        /// <summary>
        /// This is main Broadcasting method, In Any change if the broadcast call then effect will take immediatelely
        /// for all other member
        /// </summary>
        /// <param name="group"></param>
        /// <param name="removing"></param>
        //private void BroadcastGroup(PockerGroup group, bool removing = false)
        //{
        //    var clients = group.Glasses.Select(g => g.ConnectionId).ToList();
        //    Clients.Clients(clients).SendAsync("Group", removing ? null : group);
        //}

        public async Task BroadcastGroup(PockerGroup group, bool removing = false)
        {
            var clients = group.Glasses.Select(g => g.ConnectionId).ToList();
            await this.Clients.Clients(clients).SendAsync("Group", removing ? null : group);
        }
    }

    public class PockerGroup
    {
        public bool HasStarted { get; set; }
        public bool HasFinished { get; set; }
        public string Key { get; set; }
        public string WinnerConnectionId { get; set; }
        public string WinnerEmail { get; set; }

        public string GroupMessage { get; set; }
        public bool HasGroupMessage { get; set; }

        public bool ShowVote { get; set; }
        //ConnectionId
        public string Owner { get; set; }

        public string SprintGoal { get; set; }
        public string SprintKey { get; set; }

        public List<PockerPlayer> Glasses { get; set; } = new List<PockerPlayer>();

        public List<PockerCard> FiboNakkiCards { get; set; } = new List<PockerCard>();

        public List<SprintViewModel> SprintList { get; set; } = new List<SprintViewModel>();
        public int SprintIndex { get; internal set; }
        public string SprintName { get; internal set; }
        public string SprintOwnerName { get; internal set; }
    }

    public class PockerPlayer
    {
        public bool HasLeft { get; set; }
        public string ConnectionId { get; set; }
        public string Email { get; set; }

        public string EmailName { get; set; }

        public int Value { get; set; } = 100;

        public string FiboVote { get; set; }

        public bool HasVoted { get; set; }

        public bool ShowVoted { get; set; }
    }

    public class PockerCard
    {
        public bool HasLeft { get; set; }
        public string ConnectionId { get; set; }
        public string FiboId { get; set; }
        public string FiboName { get; set; }
        public string FiboValue { get; set; }
    }

    public class PlanningPockerViewModel
    {
        public List<PockerCard> FiboNakkiCards { get; set; } = new List<PockerCard>();
        public List<SprintViewModel> SprintList { get; set; } = new List<SprintViewModel>();
        public string TeamKey { get; internal set; }
    }

    public class SprintViewModel
    {
        public System.Guid SprintKey { get; set; }
        public string SprintName { get; set; }
        public string SprintGoal { get; set; }
        public string ReleasePlan { get; set; }
        public Nullable<int> StoryPointCommited { get; set; }
        public Nullable<int> StoryPointCompleted { get; set; }
        public Nullable<DateTime> SprintFrom { get; set; }
        public Nullable<DateTime> SprintTo { get; set; }
        public string CommitPoint { get; set; }
        public string SprintDurationValue { get; set; }
        public string CompletePoint { get; set; }
        public Nullable<int> SprintDurationKey { get; set; }
        public Nullable<DateTime> CreatedOn { get; set; }
    }
}
