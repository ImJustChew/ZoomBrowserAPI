
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

var YOUR_SIGNATURE_ENDPOINT="https://zoom-signature-cth.herokuapp.com"

const testConfig = {
	apiKey: '-FnNRAsyQq6RMzbUAVwoWQ',
	leaveUrl: 'https://ModernOffensiveCircle.chewtzi.repl.co/',
	userName: '05 S2SH 丘子辉',
  userEmail:'chewtzihwee@gmail.com',
	meetingNumber: 8937975618,
	passWord: '5j0PpQ', 
	role: 0
};

// Join Zoom Meeting
// https://us04web.zoom.us/j/75421847301?pwd=Q0EzOFVyWXAweWxFRzZSWHQ2a3ZOdz09

// Meeting ID: 754 2184 7301
// Passcode: i73qN5

ZoomMtg.checkSystemRequirements({'print':true})

console.log('starting meeting')
getSignature(testConfig);

function getSignature(meetConfig) {
	fetch(`${YOUR_SIGNATURE_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      meetingNumber:meetConfig.meetingNumber,
      role:meetConfig.role
    })
  })
  .then(result => result.json())
  .then(response => {
    console.log(response.signature)
    ZoomMtg.init({
      debug:true,
      leaveUrl: meetConfig.leaveUrl,
      isSupportAV: true,
      loginWindow: {  // optional,
        width: 400,
        height: 380
      },
      success: (res) => {
        console.log(meetConfig.meetingNumber)
        console.log('Zoom init successful')
        ZoomMtg.join({
          signature: response.signature,
          apiKey: meetConfig.apiKey,
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          // password optional; set by Host
          passWord: meetConfig.passWord,
          success:()=>{
            document.getElementsByClassName("join-audio-by-voip__join-btn")[0].click()
          },
          error:(res)=> { 
            console.error(res) 
          }
        })		
      },
      error: (res)=>{
        console.error(res)
      }
    })
	})
}
