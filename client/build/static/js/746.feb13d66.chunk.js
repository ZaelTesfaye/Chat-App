"use strict";(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[746],{746:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var a=r(791),s=r(978),n=r(294),i=r(689),o=r(102),c=r(949),d=r(744),l=r(12),m=r(184);const u=s.ZP.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    color: #21056c;
    font-weight: bold;
    text-decoration: none;
    gap: 5px;

    p:hover {
        color: #d1d0d5;
    }

    svg {
        font-size: 1.3rem;
        color: #930606;
    }
`,h=function(){const e=(0,i.s0)(),{isAuthenticated:t,setIsAuthenticated:r}=(0,a.useContext)(l.V);return(0,m.jsxs)(u,{onClick:async()=>{const t=await JSON.parse(localStorage.getItem("chat-app-user"))._id;200===(await n.Z.get(`${o.p_}/${t}`,{withCredentials:!0})).status&&(localStorage.clear(),r(!1),e("/login"))},children:[(0,m.jsx)(d.t7h,{}),(0,m.jsx)("p",{children:"Logout"})]})};var g=r(87),f=r(848);const p=s.ZP.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    .menu {
        cursor: pointer;
    }

    .options {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        border-radius: 0.5rem;
        background-color: #7f6ccb;
        position: absolute;
        top: 8rem;
        left: 8rem;
        width: 22rem;

        a {
            padding-top: 8px;
            color: #21056c;
            font-weight: bold;
            text-decoration: none;

            p:hover {
                color: #d1d0d5;
            }
        }

    }


`,x=()=>{const[e,t]=(0,a.useState)(!1);return(0,m.jsxs)(p,{children:[(0,m.jsx)("div",{className:"menu",onClick:()=>t(!e),children:(0,m.jsx)(f.bqP,{style:{color:"white",fontSize:"30px"}})}),e&&(0,m.jsxs)("div",{className:"options",children:[(0,m.jsxs)(g.rU,{to:"/avatar",children:[(0,m.jsx)("p",{children:"Change Avatar"})," "]}),(0,m.jsx)(g.rU,{to:"/setusername",children:(0,m.jsx)("p",{children:"Change username"})}),(0,m.jsx)(h,{})]})]})};const v=s.ZP.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            height: 3rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
        .brands {
            margin-left: 1.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .logout {
            margin-left: 1.5rem;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: #ffffff34;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-out;

            .avatar {
                img {
                    height: 3rem;
                    width: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                    font-size: 22px;
                    text-transform: capitalize;
                }
            }
        }

        .selected {
            background-color: #9a86f3;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2rem;

        .avatar {
            margin-left: 1.5rem;

            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }

        .username {
            h1 {
                color: white;
                font-size: 27px;
                padding-left: 2rem;
                text-transform: capitalize;
            }
        }

        a {
            color: #4e0eff;
            font-weight: bold;
            text-decoration: none;
            padding-right: 5px;
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }

    }
`,j=function(e){let{contacts:t,currentUser:r,changeChat:s}=e;const[n,i]=(0,a.useState)(void 0),[o,d]=(0,a.useState)(void 0),[l,u]=(0,a.useState)(void 0);return(0,a.useEffect)((()=>{r&&(d(r.avatarImage),i(r.username))}),[r]),(0,m.jsx)(m.Fragment,{children:o&&n&&(0,m.jsxs)(v,{children:[(0,m.jsxs)("div",{className:"brand",children:[(0,m.jsx)("div",{className:"logout",children:(0,m.jsx)(x,{})}),(0,m.jsxs)("div",{className:"brands",children:[(0,m.jsx)("img",{src:c,alt:"Brand"}),(0,m.jsx)("h3",{children:"Snappy"})]})]}),(0,m.jsx)("div",{className:"contacts",children:t.map(((e,t)=>(0,m.jsxs)("div",{className:`contact ${t===l?"selected":""}  `,onClick:()=>{((e,t)=>{u(e),s(t)})(t,e)},children:[(0,m.jsx)("div",{className:"avatar",children:(0,m.jsx)("img",{src:`data:image/svg+xml;base64,${e.avatarImage}`,alt:"avatar"})}),(0,m.jsx)("div",{className:"username",children:(0,m.jsx)("h3",{children:e.username})})]},t)))}),(0,m.jsxs)("div",{className:"current-user",children:[(0,m.jsx)("div",{className:"avatar",children:(0,m.jsx)("img",{src:`data:image/svg+xml;base64,${o}`,alt:"avatar"})}),(0,m.jsx)("div",{className:"username",children:(0,m.jsx)("h1",{children:n})})]})]})})};const b=s.ZP.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
    h1{
        font-size: 2rem;
    }
    h3{
        font-size: 1.5rem;
    }
`,w=function(e){let{currentUser:t}=e;return(0,m.jsxs)(b,{children:[(0,m.jsxs)("h1",{children:["Welcome ",(0,m.jsx)("span",{children:!(void 0===t)&&t.username})]}),(0,m.jsx)("h3",{children:"Please select chat to start messaging"})]})};r(655),r(869);var y=r(330),k=r(804),N=r(421);const S=s.ZP.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

        .emoji {
            position: relative;

            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }

            .EmojiPickerReact {
                position: absolute;
                top: -29.5rem;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;

                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;

                    &-thumb {
                        background-color: #9a86f3;
                    }
                }

                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }

                .emoji-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }

                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;

            &::selection {
                background-color: #9a86f3;
            }

            &:focus {
                outline: none;
            }
        }

        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg {
                    font-size: 1rem;
                }
            }

            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`,C=function(e){let{handleSendMessage:t}=e;const[r,s]=(0,a.useState)(!1),[n,i]=(0,a.useState)("");return(0,m.jsxs)(S,{children:[(0,m.jsx)("div",{className:"button-container",children:(0,m.jsxs)("div",{className:"emoji",children:[(0,m.jsx)(k.IZ1,{onClick:()=>{s((e=>!e))}}),r&&(0,m.jsx)(N.ZP,{onEmojiClick:e=>{return t=e,void i((e=>e+t.emoji));var t}})]})}),(0,m.jsxs)("form",{className:"input-container",action:"",onSubmit:e=>(e=>{e.preventDefault(),n.length>0&&(t(n),i(""))})(e),children:[(0,m.jsx)("input",{className:"input-container",type:"text",placeholder:"Type your message here",onChange:e=>{i(e.target.value)},value:n}),(0,m.jsx)("button",{className:"submit",type:"submit",children:(0,m.jsx)(y.ghy,{})})]})]})};var z=r(261);const Z=s.ZP.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                }
            }
        }
    }

    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        &::-webkit-scrollbar {
            width: 0.2rem;

            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message {
            display: flex;
            align-items: center;

            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
                @media screen and (min-width: 720px) and (max-width: 1080px) {
                    max-width: 70%;
                }
            }
        }

        .sent {
            justify-content: flex-end;

            .content {
                background-color: #4f04ff21;
            }
        }

        .received {
            justify-content: flex-start;

            .content {
                background-color: #9900ff20;
            }
        }
    }
`,I=function(e){let{currentChat:t,currentUser:r,socket:s}=e;const[i,c]=(0,a.useState)([]),[d,l]=(0,a.useState)(null),u=(0,a.useRef)();return(0,a.useEffect)((()=>{r&&t&&(async()=>{const e=await n.Z.post(o.Ds,{from:r._id,to:t._id});c(e.data)})()}),[t]),(0,a.useEffect)((()=>{s.current&&s.current.on("msg-receive",(e=>{l({fromSelf:!1,message:e})}))}),[]),(0,a.useEffect)((()=>{d&&c((e=>[...e,d]))}),[d]),(0,a.useEffect)((()=>{var e;null===(e=u.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),[i]),(0,m.jsxs)(Z,{children:[(0,m.jsx)("div",{className:"chat-header",children:(0,m.jsxs)("div",{className:"user-details",children:[(0,m.jsx)("div",{className:"avatar",children:(0,m.jsx)("img",{src:`data:image/svg+xml;base64, ${t&&t.avatarImage}`,alt:"chat avatar"})}),(0,m.jsx)("div",{className:"username",children:(0,m.jsx)("h3",{children:t&&t.username})})]})}),(0,m.jsx)("div",{className:"chat-messages",children:i.map((e=>(0,m.jsx)("div",{ref:u,children:(0,m.jsx)("div",{className:"message "+(!0===e.fromSelf?"sent":"received"),children:(0,m.jsx)("div",{className:"content",children:(0,m.jsx)("p",{children:e.message})})})},(0,z.Z)())))}),(0,m.jsx)(C,{handleSendMessage:async e=>{const a=[...i];if(a.push({fromSelf:!0,message:e}),c(a),r&&t){s.current.emit("send-msg",{to:t._id,from:r._id,msg:e});const{status:a}=await n.Z.post(o.ul,{from:r._id,to:t._id,message:e})}}})]})};var _=r(608),E=r(984);const P=s.ZP.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;

    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 40% 60%;
        }
    }
`,U=function(){const e=(0,a.useRef)(),t=(0,i.s0)(),[r,s]=(0,a.useState)([]),[c,d]=(0,a.useState)(void 0),[u,h]=(0,a.useState)(void 0),{isAuthenticated:g,setIsAuthenticated:f}=(0,a.useContext)(l.V),p=async()=>{let e=JSON.parse(localStorage.getItem("chat-app-user"));if(!e){const{data:t}=await n.Z.get(o.QH,{withCredentials:!0});localStorage.setItem("chat-app-user",JSON.stringify(t)),e=t}d(e)};(0,a.useEffect)((()=>{(async()=>{if(g)await p();else{const{data:e}=await n.Z.get(o.kj,{withCredentials:!0});e.status?(await p(),f(!0)):t("/login")}})()}),[]),(0,a.useEffect)((()=>{c&&!c.isAvatarImageSet&&t("/avatar")}),[c,t]),(0,a.useEffect)((()=>{c&&(e.current=(0,_.io)(o.ho),e.current.emit("add-user",c._id))}),[c]);const{data:x,error:v,isLoading:b}=(0,E.a)({queryKey:["contacts"],queryFn:async()=>{const{data:e}=await n.Z.get(`${o.pK}/${c._id}`);return e},enabled:!!(c&&c.isAvatarImageSet&&c.username)});return(0,a.useEffect)((()=>{x&&s(x)}),[x]),(0,m.jsx)(P,{children:(0,m.jsxs)("div",{className:"container",children:[(0,m.jsx)(j,{contacts:r,currentUser:c,changeChat:e=>{h(e)}}),c&&void 0===u?(0,m.jsx)(w,{currentUser:c}):(0,m.jsx)(I,{currentChat:u,currentUser:c,socket:e})]})})}}}]);
//# sourceMappingURL=746.feb13d66.chunk.js.map