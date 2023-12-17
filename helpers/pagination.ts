export const pagination = (currentPage: number, limitItems: number): number => {
    const Skip: number = (currentPage - 1) * limitItems;
    return Skip;
  }