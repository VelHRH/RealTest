int trigPin = 11;
int echoPin = 12;
unsigned long duration, previousTime = 0;
int curDistance, previousDistance = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);

  curDistance = (duration / 2) / 29.1;

  if (abs(curDistance - previousDistance) >= 5)
  {
    unsigned long currentTime = millis();
    Serial.print(curDistance);
    Serial.print("cm ");
    Serial.print(currentTime);
    Serial.println("ms");
    previousDistance = curDistance;
    previousTime = currentTime;
  }

  delay(500);
}