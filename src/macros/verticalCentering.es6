// http://stackoverflow.com/questions/148251/css-centering-tricks
export default function verticalCentering(height) {
  return {
    height:    height,
    position:  'absolute',
    top:       '50%',
    marginTop: -(height / 2)
  }
}