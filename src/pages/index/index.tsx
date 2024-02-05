import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { Container, TextContainer } from './style';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const texts = [
    ["When you want something,", "all the universe conspires", "in helping you to achieve it.", "Paulo Coelho"],
    ["Feed is that conspiracy:", "the conspiracy of trust."],
    ["Trust is the single", "most important ingredient", "missing from digital relationships."],
    ['Boston Consulting Group', 'and the World Economic Forum', 'forecast the digital economy', 'to be worth between', '1.5 and 2.5 trillion dollars', 'by 2016.'],
    ['The difference', 'between those numbers', 'is trust.'],
    ['Feed is a digital mechanism of trust']
];

const lineHeight = 30; // 文本行高
const lineSpacing = 30; // 行与行之间的间隔
const paragraphSpacing = 300; // 段落与段落之间的间隔

const ScrollEffect: React.FC = () => {
    const [highlightIndex, setHighlightIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef([]);
    // const navs = gsap.utils.toArray("nav a"); // 假设页面有导航链接

    useEffect(() => {
        // // 创建滚动触发器，关联到面板元素
        // const triggers = gsap.utils.toArray(".panel").map((panel, i) => {
        //     return ScrollTrigger.create({
        //         trigger: (panel as any),
        //         start: "top top",
        //         pin: true,
        //         pinSpacing: false
        //     });
        // });

        // // 添加点击导航栏滚动的事件监听器
        // (navs).forEach((nav, i) => {
        //     (nav as any).addEventListener("click", function (e:any) {
        //         e.preventDefault();
        //         gsap.to(window, {
        //             duration: 1,
        //             scrollTo: triggers[i].start
        //         });
        //     });
        // });

        // 清除滚动触发器
        // return () => {
        //     triggers.forEach(trigger => trigger.kill());
        // };
    }, []);
    useEffect(() => {
        const triggers = gsap.utils.toArray(".panel").map((panel, i) => {
            return ScrollTrigger.create({
                trigger: (panel as any),
                start: "top top",
                pin: true,
                pinSpacing: false
            });
        });
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();
            const totalLines = texts.flat().length;
            if (highlightIndex >= totalLines - 1 && e.deltaY > 0) {
                // 如果当前在最后一行且尝试向下滚动
                // if (sectionTwoRef.current) { // 确认sectionTwoRef.current不是null
                //     gsap.to(window, {
                //         scrollTo: { y: sectionTwoRef.current, autoKill: false },
                //         duration: 0.6
                //     });
                // }
                gsap.to(window, {
                    duration: 1,
                    scrollTo: triggers[1].start
                });
            } else {
                setHighlightIndex((prevIndex) => {
                    if (e.deltaY > 0) {
                        return Math.min(prevIndex + 1, totalLines - 1);
                    } else {
                        return Math.max(prevIndex - 1, 0);
                    }
                });
            }
        };

        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => (window as any).removeEventListener('wheel', handleScroll, { passive: false });
    }, [highlightIndex]);

    useEffect(() => {
        if (containerRef.current) {
            // 计算当前高亮行的总y偏移量
            let yOffset = 0;
            let totalLines = 0;
            for (let i = 0; i < texts.length; i++) {
                if (highlightIndex < totalLines + texts[i].length) {
                    yOffset += (highlightIndex - totalLines) * (lineHeight + lineSpacing);
                    break;
                }
                yOffset += texts[i].length * (lineHeight + lineSpacing) + paragraphSpacing - lineSpacing;
                totalLines += texts[i].length;
            }

            gsap.to(containerRef.current, {
                y: -yOffset,
                ease: 'power1.out'
            });
        }
    }, [highlightIndex]);

    return (
        <Container>
            <section id="one" className="panel red">
                <TextContainer className="text-container">
                    <div className='scroll-wrap' ref={containerRef}>
                        {texts.map((paragraph, pIndex) => (
                            <div key={pIndex} style={{ marginBottom: `${pIndex < texts.length - 1 ? paragraphSpacing : 0}px` }}>
                                {paragraph.map((line, lIndex) => {
                                    const flatIndex = pIndex * 3 + lIndex; // Calculate the flatIndex for this line
                                    return (
                                        <div
                                            key={lIndex}
                                            className={flatIndex === highlightIndex ? 'text-row highlight' : 'text-row'}
                                            style={{
                                                lineHeight: `${lineHeight}px`,
                                                opacity: flatIndex === highlightIndex ? 1 : 0.5,
                                                marginBottom: `${lIndex < paragraph.length - 1 ? lineSpacing : 0}px`
                                            }}
                                        >
                                            {line}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </TextContainer>
            </section>
            {/* 新增的第二个部分的结构 */}
            <section id="two" className="panel orange" ref={e => (panelRefs as any).current[1] = e}>
                TWO
            </section>

            {/* 假设的导航栏结构 */}
            <nav>
                <a href="#one">One</a>
                <a href="#two">Two</a>
            </nav>
        </Container>

    );
};

export default ScrollEffect;
