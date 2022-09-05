import './DailiesProgressBar.scss'

export default ({current, max, increment = 1, showText = false}) => {
  console.log([current, max, increment])
  let html = [];
  for (let i = increment; i <= max; i += increment) {
    if (current >= i) {
      html.push(<div className="percentage current"></div>);
    } else if (showText) {
      html.push(<div className="percentage next"></div>);
      showText = false;
    } else {
      html.push(<div className="percentage"></div>);
    }
  }

  console.log(html)

  return <div className={'bar-container'}>
    <div className={'bar'}>
      {html}
    </div>
  </div>
}