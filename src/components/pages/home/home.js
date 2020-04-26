import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import "../../../sass/home.sass";
import RecSlider from "./recSlider";
import FactsContainer from "./factsContainer";
import authorsData from "./authors.json";
import recData from "./recomended.json";
import factsData from "./booksFacts.json";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
      fact: null, // Текст факта
      progressScale: 0, // Состояние шкалы в процентах
      step: 250, // Один процент от времени цикла
      duration: 5500, // Время одного цикла
      countTime: 0, // текущее время. высчитаываем, чтобы показать процент оставшегося времени
      statusTimer: 0, // 1 = satrt, 2 = paused
    };
  }

  componentDidMount() {
    this.changeFacts(); // Выводим первый факт

    this.timer = this.intervalTimer(this.changeFacts, this.state.duration);

    document.querySelector(".facts").addEventListener("mouseover", () => {
      this.timerPause();
    });
    document.querySelector(".facts").addEventListener("mouseleave", () => {
      this.timerResume();
    });
    document.querySelector(".facts").addEventListener("touchstart", () => {
      this.timerPause();
    });
    document.querySelector(".facts").addEventListener("touchend", () => {
      this.timerResume();
    });
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearTimeout(this.timeOut);
    clearInterval(this.intervalChangeProgressScale);
    clearInterval(this.intervalChangeFacts);
  }

  changeProgressScale = () => {
    // Меняем состояние прогресс-строки
    this.intervalChangeProgressScale = setInterval(() => {
      this.setState({
        progressScale: (this.state.countTime / 5000) * 100,
        countTime: this.state.countTime + this.state.step,
      });
    }, this.state.step);
  };

  changeFacts = () => {
    // Меняем факт, чистим и запускаем по новой функцию, изменяющую состояние оставшегося времени факта
    clearInterval(this.intervalChangeProgressScale);

    this.setState({
      author: authorsData[Math.floor(Math.random() * authorsData.length)],
      fact: factsData[Math.floor(Math.random() * factsData.length)].text,
      progressScale: 0,
      countTime: 0,
    });

    this.changeProgressScale();
  };

  // ####################### ACTIONS #######################
  intervalTimer = (callback, interval) => {
    // Функция-обертка, чтобы повторно запускать интервал
    this.intervalChangeFacts = setInterval(callback, interval);
    this.setState({ statusTimer: 1 });
  };

  timerPause = () => {
    // Ставим на паузу (чистим все интервалы)
    clearTimeout(this.timeOut);
    clearInterval(this.intervalChangeProgressScale);
    clearInterval(this.intervalChangeFacts);
    this.setState({ statusTimer: 2 });
  };

  timerResume = () => {
    // Возобнавляем шкалу времени, запускаем колбек, который заново запустит интервал
    this.changeProgressScale();
    this.timeOut = setTimeout(
      this.timerTimeoutCallback,
      this.state.duration - this.state.countTime
    );
    this.setState({ statusTimer: 1 });
  };

  timerTimeoutCallback = () => {
    // Обновляем факт и запускаем занаво цикл
    this.changeFacts();
    this.timer = this.intervalTimer(this.changeFacts, this.state.duration);
  };
  // ####################### END ACTIONS #######################

  render() {
    return (
      <React.Fragment>
        <Container>
          <RecSlider
            itemData={recData[0]}
            getResTextBook={this.props.getResTextBook}
            getBookUrl={this.props.getBookUrl}
            getBookMaxCountPages={this.props.getBookMaxCountPages}
            renameNavbar={this.props.renameNavbar}
          />
        </Container>
        <FactsContainer nameContainer={"Facts"}>
          <div className="fact">{this.state.fact}</div>
          <ProgressBar now={this.state.progressScale} />
        </FactsContainer>
        <Container>
          <RecSlider
            itemData={recData[1]}
            getResTextBook={this.props.getResTextBook}
            getBookUrl={this.props.getBookUrl}
            getBookMaxCountPages={this.props.getBookMaxCountPages}
            renameNavbar={this.props.renameNavbar}
          />
        </Container>
        <FactsContainer nameContainer={"Информация о авторах"}>
          {this.state.author ? (
            <React.Fragment>
              <div className="author">
                <div className="author-img">
                  <img
                    src={this.state.author.img}
                    alt={this.state.author.name}
                  />
                </div>
                <div className="author-info">
                  <div className="name">{this.state.author.name}</div>
                  <div
                    className="little-desc"
                    dangerouslySetInnerHTML={{
                      __html: this.state.author.authorInfo,
                    }}
                  />
                  <div className="desc">
                    {this.state.author.descArr.map((item, i) => (
                      <div dangerouslySetInnerHTML={{ __html: item }} key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <ProgressBar now={this.state.progressScale} />
            </React.Fragment>
          ) : (
            "loading"
          )}
        </FactsContainer>
      </React.Fragment>
    );
  }
}

export default HomePage;
