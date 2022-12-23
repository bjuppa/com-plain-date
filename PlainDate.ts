type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export class PlainDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;

  constructor(plain: SloppyPlainDate) {
    const utc = new Date(Date.UTC(
      Number(plain.year),
      Number(plain.month) - 1,
      Number(plain.day),
    ));

    this.year = utc.getUTCFullYear();
    this.month = utc.getUTCMonth() + 1;
    this.day = utc.getUTCDate();

    Object.freeze(this);
  }
}
