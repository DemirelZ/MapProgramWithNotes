export const cardsColor = index => {
  switch (index % 5) {
    case 0:
      return '#f47373';
    case 1:
      return '#37d67a';
    case 2:
      return '#2ccce4';
    case 3:
      return '#dce775';
    case 4:
      return '#ba68c8';

    default:
      return '#f47373';
  }
};
