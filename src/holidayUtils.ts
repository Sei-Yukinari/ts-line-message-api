import holiday_jp from '@holiday-jp/holiday_jp';

export const isHoliday = (): boolean => {
  const today = new Date();
  if (holiday_jp.isHoliday(today)) return true;

  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    (month === 12 && date >= 23) ||
    (month === 1 && date <= 8) || // 冬休み判定
    (month === 3 && date >= 15) ||
    (month === 4 && date <= 5) || // 春休み判定
    (month === 7 && date >= 20) ||
    (month === 8 && date <= 20) // 夏休み判定
  );
};
