
import { Headers, RequestOptions } from '@angular/http';
let m_header: any;

const TokenHelper = () => {
    if (m_header) {
        return m_header;
    }

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && currentUser.token) {
       // console.log("header", m_header);       
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token, 'From': 'Role ' + currentUser.roleAccess });
        return m_header = new RequestOptions({ headers: headers });
    }
  
   
    
} 

export const DisposeTokenHelper = () => {
    m_header = null;
}
export default TokenHelper;

