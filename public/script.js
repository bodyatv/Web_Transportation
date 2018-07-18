window.onload=function(){

    let userName=document.getElementById("name");
    let userNick=document.getElementById("nick");
    let enterButton=document.getElementById("info_button");
    let message=document.getElementById("message");
    let messageButton=document.getElementById("sms_send");
    let messagesBlock=document.getElementsByClassName("prev_sms")[0];
    let loginForm=document.getElementsByClassName("register_block")[0];
    let chat=document.getElementsByClassName("chat")[0];
    let usersUl=document.getElementsByClassName("users")[0];

    let name,nick,input,colorUser;
    
    enterButton.onclick=function(){
        loginForm.classList.add('hide');
        chat.classList.remove('hide');    
        name=userName.value||"username";
        nick=userNick.value||"nick";
        let data={
            name: name,
            nick: nick            
        }    

        ajaxRequest({
            method:'POST',
            url:'/new_user',
            data: data    
        });
    };

    messageButton.onclick=function(){
        let nickname;
        if(message.value.indexOf('@')!==-1){
            let start=message.value.indexOf('@');
            if(message.value.indexOf(' ')!==-1){
            nickname=message.value.substring(start+1,message.value.text.indexOf(' ',start));
            }
            else{
            nickname=message.value.substring(start+1);
            }
        }
        let data={
            senderName: name+`(${nick})`,
            text: message.value,
            date: new Date().getTime(),
            receiverNick:nickname||'none'
        }
        message.value="";
        ajaxRequest({
            method:'POST',
            url: '/new_message',
            data:data
        })
    };

    let ajaxRequest=function(options){
        let method=options.method||'GET';
        let url=options.url||'/';
        let data=options.data|| {};
        let callback=options.callback|| function(){};        
        
        let xhttp=new XMLHttpRequest();
        xhttp.open(method,url,true);
        xhttp.setRequestHeader('Content-Type','application/json');
        xhttp.send(JSON.stringify(data));

        xhttp.onreadystatechange=function(){
            if (xhttp.status===200 && xhttp.readyState===4){
                callback(xhttp.responseText);
            }
        }



    };

    let getUserData=function(){
        ajaxRequest({
            method:'GET',
            url:'/users',
            callback:function(users){
                usersUl.innerHTML='';
                users=JSON.parse(users);
                for(let i=0;i<users.length;i++){
                    let el=document.createElement('li');
                    el.className="user";
                    el.innerHTML="<h3>"+users[i].name+"("+users[i].nick+")</h3>";
                    usersUl.appendChild(el);
                }

            }
        })
    };

    let getMessageData=function(){
        ajaxRequest({
            method:'GET',
            url:'/messages',
            callback:function(messages){
                messagesBlock.innerHTML="";
                messages=JSON.parse(messages);
                for(let i=0;i<messages.length;i++){
                    let el=document.createElement('div');
                    el.className="sms"; 
                    if(messages[i].receiverNick!='none'){
                        if(messages[i].receiverNick==nick){
                            el.classList.add("green");
                        }
                    }
                    el.innerHTML=`<h5>${messages[i].senderName}</h5>`+`<h6>${messages[i].text}</h6>`;
                    messagesBlock.appendChild(el);
                }
            }
        });
    };


    this.setInterval(function(){
        getUserData();
        getMessageData();
    },1000)


};































