class fajax {
    constructor(){
        this.contact = null;
        this.callback = null;
        this.url = null;
    }
    open(method , url){
        this.method = method;
        this.url=url;
    }
    send(contact){
         if (arguments.length === 1){
             this.contact = contact;
             const response = server.actionType(this.contact ,this.method,this.url);
             if(this.callback)this.callback(response);
            }
        else{
            const response = server.actionType(this.contact ,this.method ,this.url)   
            if(this.callback)this.callback(response);
        }
    }
    onload(callback){
        this.callback = callback;
    }
}

// function fajax(contact, callback) {
//         const response = server.actionType(contact);
//         callback(response);
// }
