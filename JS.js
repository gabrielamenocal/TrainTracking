 ///// ************** FIREBASE CODE ****************************
          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyBKBqq9-IYTioKxSuQGsl41OPnATkYPK14",
            authDomain: "traintracker-33379.firebaseapp.com",
            databaseURL: "https://traintracker-33379.firebaseio.com",
            projectId: "traintracker-33379",
            storageBucket: "traintracker-33379.appspot.com",
            messagingSenderId: "816251167049"
          };

          firebase.initializeApp(config);        


        ///// ************** FIREBASE CODE ENDING ****************************

        var database = firebase.database();

        console.log(database);

        // INITIAL VALUES
        var TrainName = "";
        var destination = "";
        var firstTimeTrain = "";
        var frecuency = "";

        // GET THE USER'S INPUT AND ADD A NEW TRAIN
         $("#confirm-button").on("click", function(event) {
            event.preventDefault();

            // Get inputs
            TrainName = $("#TrainName-input").val().trim();
            destination = $("#destination-input").val().trim();
            firstTimeTrain = $("#firstTime-input").val().trim();
            frecuency = $("#frecuency-input").val().trim();

            var newTrain = {
                TrainName: TrainName,
                destination: destination,
                firstTimeTrain: firstTimeTrain,
                frecuency: frecuency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            }
        });

        $("#submit-button").on("click", function(event) {
            
            var sv = Snapshot.val();

             // VALUES PRESENTED IN THE CONFIRMATION AREA BEFORE SUBMIT
            $("#NewTrain-name").text(sv.TrainName);
            $("#NewTrain-destination").text(sv.destination);
            $("#NewTrain-time").text(sv.firstTimeTrain);
            $("#NewTrain-frecuency").text(sv.frecuency); 

            database.ref().push(newTrain);        

        });

         //CLEAR THE INPUTS FIELD
         $("#TrainName-input").val("");
         $("#destination-input").val("");
         $("#firstTime-input").val("");
         $("#frecuency-input").val("");

         // CLEAR THE CONFIRMATION VALUES 
         $("#NewTrain-name").text("");
         $("#NewTrain-destination").text("");
         $("#NewTrain-time").text("");
         $("#NewTrain-frecuency").text(""); 

        // LOG JUST TO MAKE SURE
        console.log(newTrain.TrainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTimeTrain);
        console.log(newTrain.frecuency)

        // GET THE VALUES STORAGE IN FIREBASE
        database.ref().on("child_added", function(childSnapshot) {

            var csv = childSnapshot.val();

            console.log(snapshot.val());
            console.log(childSnapshot.val());

            console.log(csv.TrainName);
            console.log(csv.destination);
            console.log(csv.firstTimeTrain);
            console.log(csv.frecuency);
            console.log(csv.joinDate);
            
            TrainName =csv.TrainName;
            destination = csv.destination;
            firstTimeTrain = csv.firstTimeTrain;
            frecuency = csv.frecuency;

            var newRow = $("<tr>").append(
                $("<td>").text(TrainName),
                $("<td>").text(destination),
                $("<td>").text(firstTimeTrain),
                $("<td>").text(frecuency),
            );

            // FULL TRAIN LIST

            $("#train-table").append(newRow);           
           
            }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        // dataRef.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function(snapshot) {
        //     // Change the HTML to reflect
        //     $("#name-display").text(snapshot.val().name);
        //     $("#email-display").text(snapshot.val().email);
        //     $("#age-display").text(snapshot.val().age);
        //     $("#comment-display").text(snapshot.val().comment);
        //   });


