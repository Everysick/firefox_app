var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
var selecting_tab = "1"
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
          name: 'Percentage',
          data: [
              ['BatteryCharge', battery.level * 100],
              ['UsedBattery', 100 - battery.level * 100]
          ]
      }]
  });
}

function updateBatteryLife(){
  if(battery.charging == true){
    $('#booleans').text("充電中");
    $('#battery_type').text("充電完了までの時間");

    var at_time = battery.chargingTime;
    if(isNaN(parseInt(at_time))){
      $('#times').text("計測中");
    }else{
      $('#times').text(parseInt(at_time/3600) + "時間" + (at_time%3600/60) + "分");
    }

  }else{
    $('#booleans').text("放電中");
    $('#battery_type').text("充電切れまでの時間");

    var at_time = battery.dischargingTime;
    if(isNaN(parseInt(at_time))){
      $('#times').text("計測中");
    }else{
      $('#times').text(parseInt(at_time/3600) + "時間" + (at_time%3600/60) + "分");
    }

  }
}

battery.onlevelchange = function() {
  if(selecting_tab == "1"){
    updateBatteryStatus();  
  }
}

battery.onchargingtimechange = function(){
  if(selecting_tab == "2"){
    updateBatteryLife();
  }
}

battery.ondischargingtimechange = function(){
  if(selecting_tab == "2"){
    updateBatteryLife();
  }
}

battery.onchargingchange = function(){
  if(selecting_tab == "2"){
    updateBatteryLife();
  }
}

window.onload = function () {
  updateBatteryStatus();
  $("#tab1").click(function () {
    selecting_tab = "1"
    updateBatteryStatus();
  });
  $("#tab2").click(function () {
    selecting_tab = "2"
    updateBatteryLife();
  });
};


