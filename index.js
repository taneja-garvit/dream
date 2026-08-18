import jsonfile from "jsonfile";
import moment from 'moment';
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const makeCommits = async (n) => {
  if (n === 0) {
    console.log("Pushing to remote...");
    return simpleGit().push();
  }

  // generate a random date between 2026-01-04 and 2026-08-14 (day granularity)
  const start = moment("2026-01-04T00:00:00+00:00");
  const end = moment("2026-08-14T23:59:59+00:00");
  const days = end.diff(start, "days");
  const randDay = random.int(0, days);
  const date = start.clone().add(randDay, "days").format();

  const data = {
    date: date,
  };
  
  console.log(`Creating commit for: ${date}`);
  
  await jsonfile.writeFile(path, data);
  await simpleGit().add([path]).commit(date, { "--date": date });
  
  await makeCommits(--n);
};
  
  makeCommits(20);
