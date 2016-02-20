// http://stackoverflow.com/questions/148251/css-centering-tricks
export default function horizontalCentering(width) {
  return {
    width: width,
    position: 'absolute',
    left: '50%',
    marginLeft: -(width / 2)
  }
}
