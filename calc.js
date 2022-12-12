
   var typingTimer;
   var doneTypingInterval = 100;
   var $input2 = $('#loss');
   var $input3 = $('#deal');


   $input3.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
   });

   $input3.on('keydown', function () {
      clearTimeout(typingTimer);
   });

   document.getElementById('wins').addEventListener('input', event =>
      event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
   );

   document.getElementById('loss').addEventListener('input', event =>
      event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
   );

   document.getElementById('deal').addEventListener('input', event =>
      event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
   );

   var count = 0;
   var count2 = 1;


   // WORKING HERE

   var slider = document.getElementById('myRange');

   slider.addEventListener('change', function () {



      var wins = document.getElementById("wins").value;
      var loss = document.getElementById("loss").value;
      var deal = slider.value;

      wins = parseFloat(wins.replace(/,/g, ''));
      loss = parseFloat(loss.replace(/,/g, ''));
      deal = parseFloat(deal.replace(/,/g, ''));



      // WIN RATE
      var wr = (wins / (wins + loss)) * 100;

      //TOTAL CLOSED OPPORTUNITIES 
      var tco = wins + loss;

      //TOTAL CLOSED WON VALUE
      var total = wins * deal;

      //TOTAL CLOSED LOST VALUE
      var tclv = loss * deal

      //TOTAL CLOSED PIPELINE VALUE
      var tcpv = total + tclv

      //WIN RATE + 10%
      var wr10 = wr * 1.1;

      //INCREMENTAL WINS
      var iw = (wr10 / 100) * tco - wins;

      //INCREMENTAL REVENUE
      var ir = iw * deal;

      //WIN-BACK OPPORTUNITIES
      var wbo = loss * .2 * .1;

      //AT RISK CUSTOMERS
      var arc = wins * .2 * .05;

      // WR ROI
      var wroi = ir;

      // WIN BACK ROI
      var wbroi = wbo * deal;

      // AT RISK CUSTOMERS ROI
      var arcroi = arc * deal;


      // TOTAL ROI
      var totalRoi = wroi + wbroi + arcroi;
      totalRoi = totalRoi;
      //FIX TOTAL ROI TO BE AN ACTUAL NUMBER

      if (wins > 0 && loss > 0) {

         document.getElementById("wins").classList.remove("error")
         document.getElementById("loss").classList.remove("error")

         var dealText = document.getElementById("deal");
         dealText.value = deal.toLocaleString("en-US");
         document.getElementById("wr-roi").innerHTML = "$" + Math.round(wroi).toLocaleString("en-US");
         document.getElementById("wb-roi").innerHTML = "$" + Math.round(wbroi).toLocaleString("en-US");
         document.getElementById("at-risk-roi").innerHTML = "$" + Math.round(arcroi).toLocaleString("en-US");
         document.getElementById("total-roi").innerHTML = "$" + Math.round(totalRoi).toLocaleString("en-US");
         document.getElementById("d-w").innerHTML = Math.round(iw);
         document.getElementById("my-rate-10").innerHTML = "<div>Current</div>" + Math.round(wr) + '%';
         document.getElementById("my-rate").innerHTML = Math.round(wr10) + '%';
         document.getElementById("wri").innerHTML = "+10%"
         document.getElementById("program-roi").innerHTML = "<div class='proi'>Program ROI</div>" + '<div class="pro-roi-actual">' + Math.round(wr10) + '%' + '</div>' + '<div class="talk-link"><a href="https://www.youtube.com/" target="_blank">*Talk With Us</a></div>';





         $('#reset').css('display', 'block');


         if (count === 0) {
            var newCan = document.createElement("CANVAS");
            newCan.setAttribute('id', 'myChart');
            var canParent = document.getElementById("chart-container");
            canParent.appendChild(newCan);
         }

         if (count > 0) {
            var elem = document.getElementById("myChart");
            elem.parentNode.removeChild(elem);

            var newCan = document.createElement("CANVAS");
            newCan.setAttribute('id', 'myChart');
            var canParent = document.getElementById("chart-container");
            canParent.appendChild(newCan);

         }


         count++;




         var ctx = document.getElementById("myChart").getContext('2d');
         var pieTotal = wins + loss
         wins = wins / pieTotal;
         loss = loss / pieTotal;
         wins = wins * 100;
         loss = loss * 100;
         diff = (wins * .1);


         var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
               labels: ["Win Percentage", 'Difference', "Loss Percentage"],
               datasets: [{

                  data: [wins.toFixed(2), diff, loss.toFixed(2)], // Specify the data values array
                  borderColor: ['#00C371', '#09D4C8', '#F14035'],
                  backgroundColor: ['#00C371', '#09D4C8', '#F14035'], // Add custom color background (Points and Fill)
                  borderWidth: 1, // Specify bar border width,
                  hoverOffset: 5

               }]
            },
            options: {
               responsive: true, // Instruct chart js to respond nicely.
               maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
               cutout: 99,
               plugins: {
                  legend: {
                     display: false,

                  },

               }
            }
         });


      }

      else {
         document.getElementById("wins").classList.add("error")
         document.getElementById("loss").classList.add("error")

      }

   });



   function doneTyping() {
      var wins = document.getElementById("wins").value;
      var loss = document.getElementById("loss").value;
      var deal = document.getElementById("deal").value;
      wins = parseFloat(wins.replace(/,/g, ''));
      loss = parseFloat(loss.replace(/,/g, ''));
      deal = parseFloat(deal.replace(/,/g, ''));

      var slider = document.getElementById('myRange');




      // WIN RATE
      var wr = (wins / (wins + loss)) * 100;

      //TOTAL CLOSED OPPORTUNITIES 
      var tco = wins + loss;

      //TOTAL CLOSED WON VALUE
      var total = wins * deal;

      //TOTAL CLOSED LOST VALUE
      var tclv = loss * deal

      //TOTAL CLOSED PIPELINE VALUE
      var tcpv = total + tclv

      //WIN RATE + 10%
      var wr10 = wr * 1.1;

      //INCREMENTAL WINS
      var iw = (wr10 / 100) * tco - wins;

      //INCREMENTAL REVENUE
      var ir = iw * deal;

      //WIN-BACK OPPORTUNITIES
      var wbo = loss * .2 * .1;

      //AT RISK CUSTOMERS
      var arc = wins * .2 * .05;

      // WR ROI
      var wroi = ir;

      // WIN BACK ROI
      var wbroi = wbo * deal;

      // AT RISK CUSTOMERS ROI
      var arcroi = arc * deal;


      // TOTAL ROI
      var totalRoi = wroi + wbroi + arcroi;
      totalRoi = totalRoi;

      if (wins > 0 && loss > 0) {

         document.getElementById("wins").classList.remove("error")
         document.getElementById("loss").classList.remove("error")

         if (deal > 0) {
            slider.value = deal;

            document.getElementById("wr-roi").innerHTML = "$" + Math.round(wroi).toLocaleString("en-US");
            document.getElementById("wb-roi").innerHTML = "$" + Math.round(wbroi).toLocaleString("en-US");
            document.getElementById("at-risk-roi").innerHTML = "$" + Math.round(arcroi).toLocaleString("en-US");
            document.getElementById("total-roi").innerHTML = "$" + Math.round(totalRoi).toLocaleString("en-US");
            document.getElementById("d-w").innerHTML = Math.round(iw);
            document.getElementById("my-rate-10").innerHTML = "<div>Current</div>" + Math.round(wr) + '%';
            document.getElementById("my-rate").innerHTML = Math.round(wr10) + '%';
            document.getElementById("wri").innerHTML = "+10%"
            document.getElementById("program-roi").innerHTML = "<div class='proi'>Program ROI</div>" + '<div class="pro-roi-actual">'
               + Math.round(wr10) + '%' + '</div>' + '<div class="talk-link"><a href="https://www.youtube.com/" target="_blank">*Talk With Us</a></div>';

            if (count === 0) {
               var newCan = document.createElement("CANVAS");
               newCan.setAttribute('id', 'myChart');
               var canParent = document.getElementById("chart-container");
               canParent.appendChild(newCan);
            }

            if (count > 0) {
               var elem = document.getElementById("myChart");
               elem.parentNode.removeChild(elem);

               var newCan = document.createElement("CANVAS");
               newCan.setAttribute('id', 'myChart');
               var canParent = document.getElementById("chart-container");
               canParent.appendChild(newCan);

            }


            count++;

            var slider = document.getElementById("myRange").value;


            var ctx = document.getElementById("myChart").getContext('2d');
            var pieTotal = wins + loss
            wins = wins / pieTotal;
            loss = loss / pieTotal;
            wins = wins * 100;
            loss = loss * 100;
            diff = (wins * .1);


            var myChart = new Chart(ctx, {
               type: 'doughnut',
               data: {
                  labels: ["Win Percentage", 'Difference', "Loss Percentage"],
                  datasets: [{

                     data: [wins.toFixed(2), diff, loss.toFixed(2)], // Specify the data values array
                     borderColor: ['#00C371', '#09D4C8', '#F14035'],
                     backgroundColor: ['#00C371', '#09D4C8', '#F14035'], // Add custom color background (Points and Fill)
                     borderWidth: 1, // Specify bar border width,
                     hoverOffset: 5

                  }]
               },
               options: {
                  responsive: true, // Instruct chart js to respond nicely.
                  maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                  cutout: 99,
                  plugins: {
                     legend: {
                        display: false,

                     },

                  }
               }
            });

         }







      }

      else {
         document.getElementById("wins").classList.add("error")
         document.getElementById("loss").classList.add("error")
      }


   }



