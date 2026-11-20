import { Svg } from "../components/Svg";
import { TextFx } from "../components/TextFx";
import { Reveal, tween } from "../components/Reveal";
import "./Stats.css";

export function Stats() {
  return (
    <div className="stats-box">
      <div className="stats-box-2" data-fx="stats">
        <div className="stats-box-3">
          <div className="stats-box-4" />
          <TextFx className="stats-some-stats-we-can-proud" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="stats">
            <p className="stats-p"><span className="stats-run">{"Colophon by the numbers"}</span></p>
          </TextFx>
        </div>
        <div className="stats-box-5">
          <div className="stats-slot">
            <div className="stats-box-6">
              <Reveal className="stats-box-7" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1, 1)} playOnMount data-border="true">
                <div className="stats-box-8">
                  <div className="stats-box-9">
                    <Svg className="stats-svg" id="svg2" />
                  </div>
                </div>
                <div className="stats-1-2b">
                  <p className="stats-p-2">{"19"}</p>
                </div>
              </Reveal>
              <div className="stats-box-10">
                <Reveal className="stats-box-11" as="div" from={{ width: "0%" }} to={{ width: "100%" }} transition={tween(1, 1)} playOnMount>
                  <div className="stats-box-12">
                    <img className="stats-img" src="/images/ShyBZWxOxuSzVk7248PRdEqVXQ8.png" alt="" draggable={false} />
                  </div>
                  <Reveal className="stats-videos-moderated-every-month" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1, 1)} playOnMount>
                    <p className="stats-p-3">
                      <span className="stats-span">{"Field types, checked on save"}</span>
                    </p>
                  </Reveal>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="stats-slot-2">
            <div className="stats-box-13">
              <Reveal className="stats-box-14" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4, 2)} playOnMount data-border="true">
                <div className="stats-box-15">
                  <div className="stats-box-16">
                    <Svg className="stats-svg-2" id="svg3" />
                  </div>
                </div>
                <div className="stats-80">
                  <p className="stats-p-4">{"5"}</p>
                </div>
              </Reveal>
              <Reveal className="stats-box-17" as="div" from={{ width: "5%" }} to={{ width: "70%" }} transition={tween(0.4, 2)} playOnMount>
                <div className="stats-box-18">
                  <img className="stats-img-2" src="/images/DD8RjNS9u3eGLJ93os4DhJGwmTg.png" alt="" draggable={false} />
                </div>
                <Reveal className="stats-languages-live-and-on-demand" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4, 2)} playOnMount>
                  <p className="stats-p-5">
                    <span className="stats-span-2">{"Ways to connect, REST to MCP"}</span>
                  </p>
                </Reveal>
              </Reveal>
            </div>
          </div>
          <div className="stats-slot-3">
            <div className="stats-box-19">
              <Reveal className="stats-box-20" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4, 1)} playOnMount data-border="true">
                <div className="stats-box-21">
                  <div className="stats-box-22">
                    <Svg className="stats-svg-3" id="svg4" />
                  </div>
                </div>
                <div className="stats-15m">
                  <p className="stats-p-6">{"5"}</p>
                </div>
              </Reveal>
              <div className="stats-box-23">
                <Reveal className="stats-box-24" as="div" from={{ width: "0%" }} to={{ width: "100%" }} transition={tween(0.4, 1)} playOnMount>
                  <div className="stats-box-25">
                    <img className="stats-img-3" src="/images/2e5FtW79lNbd5S4f1ODdTftMoLc.png" alt="" draggable={false} />
                  </div>
                  <Reveal className="stats-closed-caption-in-seconds" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4, 1)} playOnMount>
                    <p className="stats-p-7">
                      <span className="stats-span-3">{"Demo sites in the repository"}</span>
                    </p>
                  </Reveal>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="stats-box-26">
            <div className="stats-box-27">
              <Svg className="stats-svg-4" id="svg5" />
            </div>
          </div>
          <div className="stats-box-28">
            <div className="stats-box-29">
              <Svg className="stats-svg-5" id="svg5" />
            </div>
          </div>
          <div className="stats-box-30">
            <div className="stats-box-31">
              <Svg className="stats-svg-6" id="svg5" />
            </div>
          </div>
          <div className="stats-box-32">
            <div className="stats-box-33">
              <Svg className="stats-svg-7" id="svg5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
