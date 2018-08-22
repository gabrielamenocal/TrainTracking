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

        // // INITIAL VALUES
        
       var newTrain = { };

        // GET THE USER'S INPUT AND ADD A NEW TRAIN
         $("#confirm-button").on("click", function(event) {
            event.preventDefault();

           var TrainName = $("#TrainName-input").val().trim();
           var  destination = $("#destination-input").val().trim();
           var firstTimeTrain = $("#firstTime-input").val().trim();
            var frequency = $("#frequency-input").val().trim();

           newTrain = {
                TrainName: TrainName,
                destination: destination,
                firstTimeTrain: firstTimeTrain,
                frequency: frequency,
            }

            console.log(newTrain);
            $("#NewTrain-name").text(newTrain.TrainName);
            $("#NewTrain-destination").text(newTrain.destination);
            $("#NewTrain-time").text(newTrain.firstTimeTrain);
            $("#NewTrain-frequency").text(newTrain.frequency);

        });

        $("#submit-button").on("click", function(event) {
            event.preventDefault();
            database.ref('/trains').push(newTrain);
        });

        // GET THE VALUES STORAGE IN FIREBASE
        database.ref('/trains').on("child_added", function(childSnapshot) {
          console.log(childSnapshot.val());

          var trainNameData = childSnapshot.val().TrainName
          var destinationData = childSnapshot.val().destination
          var frequencyData = childSnapshot.val().firstTimeTrain
          var firstTrainTimeData = childSnapshot.val().frequency

          var timeArr = firstTrainTimeData.split(":")

            // Use the array to make a actual moment() and store in trainTime
            var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1])

            // maxMoment will now be either the current time or the first train arrival of the day. Whichever is further out
            // var maxMoment = moment.max(moment(), trainTime)

            // If the first train has not come yet maxMoment is equal to trainTime (First train of the day) otherwise it is equal to the current moment
            // if (maxMoment === trainTime) {
            //
            //   // Format train arrival to be readable
            //   var tArrival = trainTime.format("hh:mm A");
            //
            //   // Use trainTime and current moment() to calculate minutes unitl next arrival
            //   var tMinutes = trainTime.diff(moment(), "minutes");
            //
            // } else {
            //
            //   // differenceTimes is how long it has passed since first train of day
            //   var differenceTimes = moment().diff(trainTime, "minutes");
            //
            //   // tRemainder is the left over of taking the diffferenceTimes and modulus frequency.
            //   var tRemainder = differenceTimes % frequencyData;
            //
            //   // tMinutes takes the frequency and - the remainder. This number is always less than frequency
            //   var tMinutes = frequencyData - tRemainder;
            //
            //   // Next arrival is the current time plus the tMinutes
            //   var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
            // }


            var newRow = $("<tr>").append(
                $("<td>").text(childSnapshot.val().TrainName),
                $("<td>").text(childSnapshot.val().destination),
                $("<td>").text(childSnapshot.val().frequency),
                // $("<td>").text(childSnapshot.val().tArrival),
                // $("<td>").text(childSnapshot.val().tMinutes),
            );
            // FULL TRAIN LIST
            $("#train-table").append(newRow);

        });