import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";

const hours = 11;
const minutes = 22;
const seconds = 33;
const milliseconds = 44;

Deno.bench("calculate", { group: "tally", baseline: true }, () => {
  Number(hours) * MS_IN_HOUR + Number(minutes) * MS_IN_MINUTE +
    Number(seconds) * MS_IN_SECOND + Number(milliseconds);
});

Deno.bench("Date.UTC()", { group: "tally" }, () => {
  Date.UTC(1970, 0, 1, hours, minutes, seconds, milliseconds);
});

/*
 benchmark       time (avg)             (min … max)       p75       p99      p995
-------------------------------------------------- -----------------------------
calculate        4.74 ns/iter    (4.23 ns … 32.31 ns)    4.6 ns  11.92 ns  15.61 ns
Date.UTC()      48.45 ns/iter   (42.35 ns … 86.79 ns)  48.29 ns  74.48 ns   79.4 ns

summary
  calculate
   10.23x faster than Date.UTC()
 */
