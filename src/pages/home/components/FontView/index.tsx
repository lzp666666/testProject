import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { Container, TextContainer } from './style';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
const texts = [
    ["When you want something,", "all the universe conspires", "in helping you to achieve it.", "Paulo Coelho"],
    ["Feed is that conspiracy:", "the conspiracy of trust."],
    ["Trust is the single", "most important ingredient", "missing from digital relationships."],
    ['Boston Consulting Group', 'and the World Economic Forum', 'forecast the digital economy', 'to be worth between', '1.5 and 2.5 trillion dollars', 'by 2016.'],
    ['The difference', 'between those numbers', 'is trust.', '', ''],
    ['Feed is a digital mechanism of trust']
];

const lineHeight = 30; // 文本行高
const lineSpacing = 30; // 行与行之间的间隔
const paragraphSpacing = 300; // 段落与段落之间的间隔

const ScrollEffect: React.FC<{ onStateFont: (val: boolean) => void }> = ({ onStateFont }) => {
    const [highlightIndex, setHighlightIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();
            const totalLines = texts.flat().length;
            if (highlightIndex >= totalLines - 1 && e.deltaY > 0) {
                // 如果当前在最后一行且尝试向下滚动，滚动到第二个section
                console.log('滚动到底部')
                onStateFont(false)
                window.removeEventListener('wheel', handleScroll)
            } else {
                setHighlightIndex((prevIndex) => {
                    // 否则按行进行滚动
                    if (e.deltaY > 0) {
                        return Math.min(prevIndex + 1, totalLines); // 向下滚动一行
                    } else {
                        return Math.max(prevIndex - 1, 0); // 向上滚动一行
                    }
                });
            }
        };

        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [highlightIndex]);

    useEffect(() => {
        console.log('highlightIndex',highlightIndex)
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
            <div className='left-bottom-text' style={{opacity:5/highlightIndex}}>
                <div>
                    Feed is an intelligent property rights and payments platform, using intelligent software and digital security that goes well beyond 'military-grade' to give users true ownership of their data and IP.
                </div>
                <div>
                    <p>Feed facilitates trusted exchanges of users' progressively-perfecting data assets with businesses, researchers, and governments in a <b>trusted</b>, audited, and independently verifiable manner; on their own terms and conditions.</p>
                </div>
            </div>
        </Container>

    );
};

export default ScrollEffect;
