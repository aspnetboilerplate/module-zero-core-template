import { Component, Injector, AfterViewInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
  templateUrl: "./home.component.html",
  animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements AfterViewInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    $(function() {
      // Widgets count
      $(".count-to").countTo();

      // Sales count to
      $(".sales-count-to").countTo({
        formatter: function(value, options) {
          return (
            "$" +
            value
              .toFixed(2)
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, " ")
              .replace(".", ",")
          );
        }
      });

      initRealTimeChart();
      initDonutChart();
      initSparkline();
    });

    let realtime = "on";
    function initRealTimeChart() {
      // Real time ==========================================================================================
      const plot = ($ as any).plot("#real_time_chart", [getRandomData()], {
        series: {
          shadowSize: 0,
          color: "rgb(0, 188, 212)"
        },
        grid: {
          borderColor: "#f3f3f3",
          borderWidth: 1,
          tickColor: "#f3f3f3"
        },
        lines: {
          fill: true
        },
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          min: 0,
          max: 100
        }
      });

      function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        let timeout;
        if (realtime === "on") {
          timeout = setTimeout(updateRealTime, 320);
        } else {
          clearTimeout(timeout);
        }
      }

      updateRealTime();

      $("#realtime").on("change", function() {
        realtime = (this as any).checked ? "on" : "off";
        updateRealTime();
      });
      // ====================================================================================================
    }

    function initSparkline() {
      $(".sparkline").each(function() {
        const $this = $(this);
        $this.sparkline("html", $this.data());
      });
    }

    function initDonutChart() {
      (window as any).Morris.Donut({
        element: "donut_chart",
        data: [
          {
            label: "Chrome",
            value: 37
          },
          {
            label: "Firefox",
            value: 30
          },
          {
            label: "Safari",
            value: 18
          },
          {
            label: "Opera",
            value: 12
          },
          {
            label: "Other",
            value: 3
          }
        ],
        colors: [
          "rgb(233, 30, 99)",
          "rgb(0, 188, 212)",
          "rgb(255, 152, 0)",
          "rgb(0, 150, 136)",
          "rgb(96, 125, 139)"
        ],
        formatter: function(y) {
          return y + "%";
        }
      });
    }

    let data = [];
    const totalPoints = 110;

    function getRandomData() {
      if (data.length > 0) {
        data = data.slice(1);
      }

      while (data.length < totalPoints) {
        const prev = data.length > 0 ? data[data.length - 1] : 50;
        let y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        data.push(y);
      }

      const res = [];
      for (let i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
      }

      return res;
    }
  }
}
