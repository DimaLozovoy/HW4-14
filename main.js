class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = this.getRefs();
    this.start();
  } //робим клас для таймера

  getRefs() {
    const container = document.querySelector(this.selector);
    return {
      days: container.querySelector('[data-value="days"]'),
      hours: container.querySelector('[data-value="hours"]'),
      mins: container.querySelector('[data-value="mins"]'),
      secs: container.querySelector('[data-value="secs"]'),
    };
  } //домік

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.updateClockface(0);
        return;
      }

      this.updateClockface(time);
    }, 1000); // кожну секунду перевіряємо час
  }

  updateClockface(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.pad(hours);
    this.refs.mins.textContent = this.pad(mins);
    this.refs.secs.textContent = this.pad(secs); //тут ви знаєте
  }

  pad(value) {
    return String(value).padStart(2, "0");
  } //щоб красіва було
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date(2025, 5, 17, 15, 47, 28), // july 17 2025
}); // ну і наш екземпляр таймера
