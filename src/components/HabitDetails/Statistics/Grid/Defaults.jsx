const VerticalOffset = 17
const HorizontalOffset = 35
const GridGutter = 2
const DayWidth = 11
const DayHeight = 11

const calcXCoo = (columns, column) => {
  const fullWidth = DayWidth * columns + columns * GridGutter
  const currRectPos = DayWidth * (column + 1) + (column + 1) * GridGutter
  return fullWidth - currRectPos + HorizontalOffset
}

const calcYCoo = row => {
  const rows = 7
  const fullHeight = DayHeight * rows + rows * GridGutter
  const currRectPos = DayHeight * (rows - row) + (rows - row) * GridGutter
  return fullHeight - currRectPos + VerticalOffset
}

const calcColumns = width => {
  return Math.floor((width - HorizontalOffset) / (DayWidth + GridGutter))
}

export {
  calcYCoo,
  calcXCoo,
  calcColumns,
  VerticalOffset,
  HorizontalOffset,
  GridGutter,
  DayWidth,
  DayHeight,
}
