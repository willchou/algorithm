// 实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。

// 示例：
class Scheduler {
  constructor() {
    this.fnIdMap = {};
    this.queue = [];
    this.limit = 2;
    this.countId = 0;
  }
  async add(fn) {
    return new Promise((resolve, reject) => {
      const { id } = this;
      this.fnIdMap[id] = fn;
      this.id++;
      this.queue.push({
        id,
        resolve,
      });

      if (this.queue.length <= this.limit) {
        fn().then(() => {
          resolve();
          this.taskCtrl(id);
        });
      }
    });
  }

  taskCtrl(fnId) {
    const index = this.queue.filter((item) => {
      return item.id === fnId;
    });

    this.queue.splice(index, 1);

    if (this.queue.length >= this.limit) {
      const item = this.queue[this.limit - 1];
      const fn = this.fnIdMap[item.id];
      fn().then(() => {
        item.resolve();
        this.taskCtrl();
      });
    }
  }
}


const scheduler = new Scheduler();

const timeout = (time) => {
  return new Promise((r) => setTimeout(r, time));
};

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order));
};


addTask(1000, 1);

addTask(500, 2);

addTask(300, 3);

addTask(400, 4);

// log: 2 3 1 4
