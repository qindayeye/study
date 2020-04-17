#define BLINKER_WIFI
#include <Blinker.h>

#include "HX711.h"


unsigned long previousMillis[5] = {0};        //毫秒时间记录
unsigned long interval[5] = {5000, 6000, 1000, 0, 0};    //时间间隔
int     Connet_Cnt  = 0;            //定时器计数  用于 10分钟刷新 数据一次
bool    WiFi_Status = 0;


int sensorValue = 0; //从传感器读取的数值存储到这个变量中
// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = D7;  // / loadcell_pout_pin
const int LOADCELL_SCK_PIN = D6;   // / loadcell_sck_pin


char auth[] = "c6bbf85af54f";
char ssid[] = "mmm";
char pswd[] = "12345678";

//char auth[] = "c6bbf85af54f";
//char ssid[] = "plus";
//char pswd[] = "linshifa.";


HX711 scale;

//按键定义
BlinkerButton Button1("btn1");  //第一路继电器
BlinkerButton Button2("btn2");  //第二路继电器
BlinkerButton Button3("btn3");  //第三路继电器


BlinkerNumber Number1("num1");     //重量
BlinkerNumber Number2("num2");     //重量
BlinkerNumber Number3("num3");     //重量


// 按下按键即会执行该函数
void button1_callback(const String & state)
{
  BLINKER_LOG("get button state: ", state); // / blinker_log


  if (state == "on")
  {
    digitalWrite(D1, LOW);
    // 反馈开关状态
    Button1.color("#ff0000");  //打开红色
    Button1.print("on");
  }
  else if (state == "off")
  {
    digitalWrite(D1, HIGH);
    // 反馈开关状态
    Button1.color("#C0C0C0");
    Button1.print("off");
  }
}

//第二路
void button2_callback(const String & state)
{
  BLINKER_LOG("get button state: ", state);


  if (state == "on")
  {
    digitalWrite(D0, LOW);
    // 反馈开关状态
    Button2.color("#ff0000");  //打开红色
    Button2.print("on");
  }
  else if (state == "off")
  {
    digitalWrite(D0, HIGH);
    // 反馈开关状态
    Button2.color("#C0C0C0");
    Button2.print("off");
  }
}

//第三路
void button3_callback(const String & state)
{
  BLINKER_LOG("get button state: ", state);

  if (state == "on")
  {
    digitalWrite(D2, LOW);
    // 反馈开关状态
    Button3.color("#ff0000");  //打开红色
    Button3.print("on");
  }
  else if (state == "off")
  {
    digitalWrite(D2, HIGH);
    // 反馈开关状态
    Button3.color("#C0C0C0");
    Button3.print("off");
  }
}



long Val = 0;

void setup()
{

  Serial.begin(9600);
  BLINKER_DEBUG.stream(Serial);
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);

  digitalWrite(D0, 1);
  digitalWrite(D1, 1);
  digitalWrite(D2, 1);

  pinMode(2, OUTPUT);

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  Serial.print("read average: \t\t");
  Serial.println(scale.read_average(20));  // 读取平均值

  scale.set_scale(312.f);    // 修正系数
  //scale.set_offset(161880);
  scale.tare();             //自动设置偏移量


  // 初始化blinker
  Blinker.begin(auth, ssid, pswd);
  Button1.attach(button1_callback);
  Button2.attach(button2_callback);
  Button3.attach(button3_callback);
}


//wifi链接状态监测定时器函数
void wifi_connet_timer()
{
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis[0] >= interval[0])
  {
    previousMillis[0] = currentMillis;      /*更新时间记录*/

    if ( WiFi.status() == WL_CONNECTED)     /* 判断wifi连接状态 */
    {
      digitalWrite(2, 0);

      WiFi_Status = 1;
      interval[0] = 2000;   //调整wifi监测链接状态时间为1S
      digitalWrite(0, LOW);
      if ( (++Connet_Cnt == 10) )  /*  */
      {
        Connet_Cnt = 0;
      }

    }
    else   //WiFi未连接上
    {
      digitalWrite(2, !digitalRead(2));      //LED闪烁

      WiFi_Status = 0;
      interval[0] = 200;

    }
  }
}


void loop() {

  Blinker.run();
  wifi_connet_timer();
  if (WiFi_Status == 1)
  {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis[1] >= interval[1])
    {
      previousMillis[1] = currentMillis;      /*更新时间记录*/

      Serial.println("======================");


      Val = scale.get_units(10);
      Serial.println((int)Val, 1);

      Number1.print((int)Val);
      Serial.println("======================\r\n");

      scale.power_down();              // put the ADC in sleep mode
      Blinker.delay(10);
      scale.power_up();

    }
  }
}
