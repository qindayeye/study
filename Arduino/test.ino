void setup()
{
    pinMode(6,output);

    pinMode(7,output);

    pinMode(8,output);

    pinMode(9,output);

    pinMode(10,output);

    pinMode(11,output);
}

void loop()
{
    digitalWrite(6,LOW);

    digitalWrite(7,HIGHT);

    delay(200);

    digitalWrite(7,LOW);

    digitalWrite(8,HIGHT);

    delay(200);

    digitalWrite(8,LOW);

    digitalWrite(9,HIGHT);
}
