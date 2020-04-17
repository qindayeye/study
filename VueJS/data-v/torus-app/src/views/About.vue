<template>
  <div class="about">
    <dv-charts class="dc" :option="option" />
    <button @click="getM()">加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        legend: {
          data: ["重量变化"],
          textStyle: {
            fill: "#fff"
          }
        },
        xAxis: {
          name: "时间",
          data: [
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00"
          ],
          // boundaryGap: false, // 是否贴边显示
          axisLine: {
            style: {
              stroke: "#345677"
            }
          },
          axisLabel: {
            style: {
              fill: "red"
            }
          },
          axisTick: {
            // show: false  // 坐标轴上的点是否显示
          }
        },
        yAxis: {
          name: "重量/g",
          data: "value",
          splitLine: {
            // show: false  // 图标中间的横线是否显示
          },
          axisLine: {
            style: {
              stroke: "#000"
            }
          },
          axisLabel: {
            style: {
              fill: "red"
            },
            formatter({ value }) {
              return value.toFixed(2);
            }
          },
          axisTick: {
            // show: false
          },
          min: 0,
          max: 100,
          interval: 10
        },
        series: [
          {
            data: [39, 34, 35, 39, 46, 48, 50, 63, 71, 45],
            smooth: true,
            type: "line",
            name: "重量变化情况",
            label: {
              show: true,
              formatter: "{value}g"
            },
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"]
            },
            linePoint: {
              radius: 3,
              style: {
                fill: "#00db95"
              }
            }
          }
        ]
      }
    };
  },
  // created() {
  //   setInterval(() => {
  //     // console.log('>')
  //     this.getM();
  //   },2000);
  // },
  methods: {
    getM() {
      console.log(">");
      let tdata = this.option.xAxis.data;
      let ytime = 0;
      let ztime = 0;
      let tdataz = tdata.shift().substring(0, 2);
      console.log(tdataz[0] == 0);
      if (tdataz[0] == 0) {
        ztime = +tdataz[1];
      } else {
        ztime = +tdataz;
      }

      let time = ztime + 10;
      if (time > 23) {
        ytime = time % 24;
        ytime = "0" + ytime + ":00";
      } else {
        ytime = time + ":00";
      }
      tdata.push(ytime);
      console.log(ztime, "---", ytime, "---", time);
      this.option.xAxis.data = tdata;
      console.log(tdata);
    }
  }
};
</script>
<style lang="stylus" scoped>
.about {
  height: 300px;
  width: 100%;
}

.dc {
}
</style>