function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  var qst = document.getElementById("round3");
  var ans = document.getElementById("round-3");
  var incorrect = document.getElementById("incorrect");
  
  async function getDataFromFirestore() {
    const db = firebase.firestore();
    const user = await db.collection("user");
    const userRef = user.doc(localStorage.getItem('userId'));
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
  
    if (userData.round == 2) {
  
      const querySnapshot = await db.collection("data3").get();
      const dataArray = querySnapshot.docs.map((doc) => doc.data());
      const questionAnswerId = getRandomInt(dataArray.length);
  
      user.doc(localStorage.getItem('userId')).update({
        round : 3
      })
      user.doc(localStorage.getItem('userId')).update({
        r3q : dataArray[questionAnswerId]["question"],
        r3a : dataArray[questionAnswerId]["answer"]
      })
      qst.innerHTML = dataArray[questionAnswerId]["question"];
  
      document.getElementById("round-3").addEventListener("keyup", (e) => {
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
        var answer = document.getElementById("round-3").value;
        if (
          answer.toLowerCase() ==
          dataArray[questionAnswerId]["answer"].toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the third round")
          );
          window.location.replace("round4.html");
        } else {
          incorrect.innerHTML = "Incorrect answer";
        }
      });
    } else {
  
      const userRef = user.doc(localStorage.getItem('userId'));
      const userSnapshot = await userRef.get();
      const userData = userSnapshot.data();
      
      if (userData.round == 1) {
        window.location.replace("index.html");
      } else if (userData.round == 2) {
        window.location.replace("round2.html")
      } else if (userData.round == 4) {
        window.location.replace("round4.html");
      }
      
      qst.innerHTML = userData.r3q;
  
      document.getElementById("round-3").addEventListener("keyup", (e) => {
        if (
          e.target.value.toLowerCase() ==
          userData.r3a.toLowerCase()
        ) {
          document.querySelector("#submit").style.display = "block";
        } else {
          document.querySelector("#submit").style.display = "none";
        }
      });
      document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        var answer = document.getElementById("round-3").value;
        if (
          answer.toLowerCase() ==
          userData.r3a.toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the third round")
          );
          window.location.replace("round4.html");
        } else {
          incorrect.innerHTML = "Incorrect answer";
        }
      });
    }
  }
  getDataFromFirestore();
  