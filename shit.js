const elevatorDzu = (stories, bajaneluTiv) => {
  return Math.floor(stories / bajaneluTiv) + bajaneluTiv - 1;
};
const findMaxElevatorDzu = () => {
  for (let i = 1; i <= 100; ++i) {
    console.log(i, elevatorDzu(100, i));
  }
};
findMaxElevatorDzu();
