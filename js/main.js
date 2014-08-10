window.onload = function () {
  $("#tab1").click(function () {
    updateBatteryStatus();
  });

  $("#updateButton").click(function () {
    updateBatteryStatus();

    var power = navigator.mozPower || navigator.power || navigator.webkitPower;
    if (power.screenEnabled) {
      power.screenBrightness = 0.5;
    }
  });

};

  //sessionStorage.setItem("username", "John");
  //alert( "username = " + sessionStorage.getItem("username"));

  var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
  function updateBatteryStatus(){
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Battery Status'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['BatteryCharge',   battery.level * 100],
                ['UsedBattery',       100 - battery.level * 100]
            ]
        }]
    });
  }


