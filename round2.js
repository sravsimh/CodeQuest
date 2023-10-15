function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  var qst = document.getElementById("round2");
  var ans = document.getElementById("round-2");
  var incorrect = document.getElementById("incorrect");
  
  async function getDataFromFirestore() {
    const db = firebase.firestore();
    const user = await db.collection("user");
    const userRef = user.doc(localStorage.getItem('userId'));
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
  
    if (userData.round == 1) {
  
      const querySnapshot = await db.collection("data2").get();
      const dataArray = querySnapshot.docs.map((doc) => doc.data());
      const questionAnswerId = getRandomInt(dataArray.length);
  
      user.doc(localStorage.getItem('userId')).update({
        round : 2
      })
      user.doc(localStorage.getItem('userId')).update({
        r2q : dataArray[questionAnswerId]["question"],
        r2a : dataArray[questionAnswerId]["answer"]
      })
      
      qst.innerHTML = dataArray[questionAnswerId]["question"];
  
      document.getElementById("round-2").addEventListener("keyup", (e) => {
        if (
          e.target.value.toLowerCase() ==
          dataArray[questionAnswerId]["answer"].toLowerCase()
        ) {
          document.querySelector("#submit").style.display = "block";
        } else {
          document.querySelector("#submit").style.display = "none";
        }
      });
      document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        var answer = document.getElementById("round-2").value;
        if (
          answer.toLowerCase() ==
          dataArray[questionAnswerId]["answer"].toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the second round")
          );
          window.location.replace("round3.html");
        } else {
          incorrect.innerHTML = "Incorrect answer";
        }
      });
    } else {
  
      const userRef = user.doc(localStorage.getItem('userId'));
      const userSnapshot = await userRef.get();
      const userData = userSnapshot.data();
      
      if (userData.round == 1) {
        window.location.replace("round2.html");
      } else if (userData.round == 3) {
        window.location.replace("round3.html")
      } else if (userData.round == 4) {
        window.location.replace("round4.html");
      }
      
      qst.innerHTML = userData.r2q;
  
      document.getElementById("round-2").addEventListener("keyup", (e) => {
        if (
          e.target.value.toLowerCase() ==
          userData.r2a.toLowerCase()
        ) {
          document.querySelector("#submit").style.display = "block";
        } else {
          document.querySelector("#submit").style.display = "none";
        }
      });
      document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        var answer = document.getElementById("round-2").value;
        if (
          answer.toLowerCase() ==
          userData.r2a.toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the second round")
          );
          window.location.replace("round3.html");
        } else {
          incorrect.innerHTML = "Incorrect answer";
        }
      });
    }
  
  }
  getDataFromFirestore();
  