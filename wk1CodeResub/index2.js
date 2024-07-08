function calculatePoints(speed) {
    const speedLimit = 70;   
    if (speed <= speedLimit) {
      console.log("Ok");
    } else {
      const excessSpeed = speed - speedLimit;
      const demeritPoints = Math.floor(excessSpeed / 5);
  
      if (demeritPoints > 12) {
        console.log("License suspended");
      } else {
        console.log(`Points: ${demeritPoints}`);
      }
    }
  }
  
  //calculatePoints(/Enter your input/);

  calculatePoints(80);