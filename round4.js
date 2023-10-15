function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  var qst = document.getElementById("round4");
  var ans = document.getElementById("round-4");
  var incorrect = document.getElementById("incorrect");
  
  async function getDataFromFirestore() {
    const db = firebase.firestore();
    const user = await db.collection("user");
    const userRef = user.doc(localStorage.getItem('userId'));
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
  
    if (userData.round == 3) {
  
      const querySnapshot = await db.collection("data4").get();
      const dataArray = querySnapshot.docs.map((doc) => doc.data());
      const questionAnswerId = getRandomInt(dataArray.length);
  
      user.doc(localStorage.getItem('userId')).update({
        round : 4
      })
      user.doc(localStorage.getItem('userId')).update({
        r4q : dataArray[questionAnswerId]["question"],
        r4a : dataArray[questionAnswerId]["answer"]
      })
      qst.innerHTML = dataArray[questionAnswerId]["question"];
  
      document.getElementById("round-4").addEventListener("keyup", (e) => {
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
        var answer = document.getElementById("round-4").value;
        if (
          answer.toLowerCase() ==
          dataArray[questionAnswerId]["answer"].toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the forth round")
          );
          window.location.replace("index.html");
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
      } else if (userData.round == 3) {
        window.location.replace("round3.html");
      }
      
      qst.innerHTML = userData.r4q;
  
      document.getElementById("round-4").addEventListener("keyup", (e) => {
        if (
          e.target.value.toLowerCase() ==
          userData.r4a.toLowerCase()
        ) {
          document.querySelector("#submit").style.display = "block";
        } else {
          document.querySelector("#submit").style.display = "none";
        }
      });
      document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        var answer = document.getElementById("round-4").value;
        if (
          answer.toLowerCase() ==
          userData.r4a.toLowerCase()
        ) {
          setTimeout(
            3000,
            alert("Congratulations, you have completed the fourth round")
          );
          window.location.replace("index.html");
        } else {
          incorrect.innerHTML = "Incorrect answer";
        }
      });
    }
  }
  getDataFromFirestore();
  