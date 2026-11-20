import { Svg } from "../components/Svg";
import { TextFx } from "../components/TextFx";
import { Reveal, tween, spring } from "../components/Reveal";
import "./Process.css";

export function Process() {
  return (
    <div className="process-worldwide-section">
      <div className="process-box">
        <div className="process-box-2">
          <div className="process-box-3" />
          <div className="process-box-4" />
        </div>
        <div className="process-box-5">
          <div className="process-box-6" />
          <div className="process-box-7" />
        </div>
        <div className="process-box-8">
          <div className="process-box-9" />
          <div className="process-box-10" />
        </div>
        <div className="process-box-11">
          <div className="process-box-12" />
          <div className="process-box-13" />
        </div>
      </div>
      <div className="process-box-14">
        <div className="process-box-15">
          <div className="process-box-16" data-fx="process">
            <Reveal className="process-box-17" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="process">
              <div className="process-slot">
                <Reveal className="process-box-18" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="process">
                  <div className="process-box-19">
                    <img className="process-img" src="/images/Zjrmwe3YbcnHpy6Jg4e5u4u6EWY.png" alt="" draggable={false} />
                  </div>
                  <Reveal className="process-worldwide" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="process">
                    <p className="process-p">
                      <span className="process-span">{"How it works"}</span>
                    </p>
                  </Reveal>
                </Reveal>
              </div>
              <div className="process-box-20" />
            </Reveal>
            <TextFx className="process-box-21" as="div" tokenization="line" transition={{ ...spring(0.4, 0), delay: 0.075 }} target="process">
              <p className="process-p-2">{"From first draft "}<span className="process-run">{"to printed receipt"}</span></p>
            </TextFx>
          </div>
          <div className="process-box-22">
            <div className="process-box-23">
              <div className="process-box-24">
                <Svg className="process-svg" id="svg10" />
              </div>
            </div>
            <div className="process-box-25">
              <div className="process-box-26" data-fx="process-1">
                <div className="process-box-27" />
                <div className="process-box-28 step-media">
                  <div className="process-box-29">
                    <img className="process-img-2" src="/images/colophon/step-write.webp" alt="" draggable={false} />
                  </div>
                </div>
              </div>
              <div className="process-box-30">
                <TextFx className="process-01" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-1">
                  <p className="process-p-3"><span className="process-run-2">{"[01]"}</span></p>
                </TextFx>
                <Reveal className="process-box-31" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1)} target="process-1" />
                <TextFx className="process-connect-your-sources" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-1">
                  <p className="process-p-4">{"Write a post"}</p>
                </TextFx>
              </div>
              <div className="process-box-32">
                <TextFx className="process-box-33" as="div" tokenization="line" transition={{ ...tween(0.8), delay: 0.075 }} target="process-1">
                  <p className="process-p-5">{"Draft your site’s articles with 19 field types and references that can’t dangle."}</p>
                </TextFx>
              </div>
            </div>
            <div className="process-box-34">
              <div className="process-box-35">
                <Svg className="process-svg-2" id="svg10" />
              </div>
            </div>
            <div className="process-box-36">
              <div className="process-box-37" data-fx="process-2">
                <div className="process-box-38" />
                <div className="process-box-39 step-media">
                  <div className="process-box-40">
                    <img className="process-img-3" src="/images/colophon/step-review.webp" alt="" draggable={false} />
                  </div>
                </div>
              </div>
              <div className="process-box-41">
                <TextFx className="process-02" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.05 }} target="process-2">
                  <p className="process-p-6"><span className="process-run-2">{"[02]"}</span></p>
                </TextFx>
                <div className="process-box-42">
                  <Reveal className="process-box-43" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1)} target="process-2" />
                  <TextFx className="process-live-analysis-starts" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-2">
                    <p className="process-p-7">{"Send it for review"}</p>
                  </TextFx>
                </div>
              </div>
              <div className="process-box-44">
                <TextFx className="process-box-45" as="div" tokenization="line" transition={{ ...tween(0.8), delay: 0.075 }} target="process-2">
                  <p className="process-p-8">{"Reviewers approve each change. Scripts and AI agents can draft, never approve."}</p>
                </TextFx>
              </div>
            </div>
            <div className="process-box-46">
              <div className="process-box-47">
                <Svg className="process-svg-3" id="svg10" />
              </div>
            </div>
            <div className="process-box-48">
              <div className="process-box-49" data-fx="process-3">
                <div className="process-box-50" />
                <div className="process-box-51 step-media">
                  <div className="process-box-52">
                    <img className="process-img-4" src="/images/colophon/step-publish.webp" alt="" draggable={false} />
                  </div>
                </div>
              </div>
              <div className="process-box-53">
                <TextFx className="process-03" as="div" tokenization="character" transition={{ ...tween(1), delay: 0.05 }} target="process-3">
                  <p className="process-p-9"><span className="process-run-2">{"[03]"}</span></p>
                </TextFx>
                <Reveal className="process-box-54" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1)} target="process-3" />
                <TextFx className="process-be-smart-in-the-room" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-3">
                  <p className="process-p-10">{"Publish it"}</p>
                </TextFx>
              </div>
              <div className="process-box-55">
                <TextFx className="process-box-56" as="div" tokenization="line" transition={{ ...tween(0.8), delay: 0.075 }} target="process-3">
                  <p className="process-p-11">{"A publish lands once and completely, or not at all."}</p>
                </TextFx>
              </div>
            </div>
            <div className="process-box-57">
              <div className="process-box-58">
                <Svg className="process-svg-4" id="svg10" />
              </div>
            </div>
            <div className="process-box-59">
              <div className="process-box-60" data-fx="process-4">
                <div className="process-box-61" />
                <div className="process-box-62 step-media">
                  <div className="process-box-63">
                    <img className="process-img-5" src="/images/colophon/step-receipt.webp" alt="" draggable={false} />
                  </div>
                </div>
              </div>
              <div className="process-box-64">
                <TextFx className="process-03-2" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-4">
                  <p className="process-p-12">{"[04]"}</p>
                </TextFx>
                <Reveal className="process-box-65" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(1)} target="process-4" />
                <TextFx className="process-be-smart-in-the-room-2" as="div" tokenization="line" transition={{ ...tween(1), delay: 0.075 }} target="process-4">
                  <p className="process-p-13">{"Get a receipt"}</p>
                </TextFx>
              </div>
              <div className="process-box-66">
                <TextFx className="process-box-67" as="div" tokenization="line" transition={{ ...tween(0.8), delay: 0.075 }} target="process-4">
                  <p className="process-p-14">{"See what went live, when, and where readers saw it."}</p>
                </TextFx>
              </div>
            </div>
            <div className="process-box-68">
              <div className="process-box-69">
                <Svg className="process-svg-5" id="svg10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="process-box-70">
        <div className="process-box-71">
          <Svg className="process-svg-6" id="svg11" />
        </div>
      </div>
      <div className="process-box-72">
        <div className="process-box-73">
          <Svg className="process-svg-7" id="svg11" />
        </div>
      </div>
      <div className="process-box-74">
        <div className="process-box-75">
          <div className="process-box-76" />
          <div className="process-box-77" />
        </div>
        <div className="process-box-78">
          <div className="process-box-79" />
          <div className="process-box-80" />
        </div>
        <div className="process-box-81">
          <div className="process-box-82" />
          <div className="process-box-83" />
        </div>
        <div className="process-box-84">
          <div className="process-box-85" />
          <div className="process-box-86" />
        </div>
      </div>
    </div>
  );
}
