import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FontView from './components/FontView';
import { Container } from './style';
const useHome = () => {
    const main = useRef<HTMLElement | null>(null);
    const scrollTween = useRef<gsap.core.Tween | null>(null);
    const [isFontView, setIsFontState] = useState(true)
    const { contextSafe } = useGSAP(
        () => {
            const panels = gsap.utils.toArray('.panel');
            panels.forEach((panel: unknown, i) => {
                ScrollTrigger.create({
                    trigger: (panel as any),
                    start: 'top bottom',
                    end: '+=200%',
                    onToggle: (self) => {
                        // 使用indexOf方法获取当前触发的panel的index
                        const currentSectionIndex = panels.indexOf(panel);

                        console.log('current section index: ', currentSectionIndex);
                        console.log('self', self)
                        if (!isFontView) {
                            self.isActive && !scrollTween.current && goToSection(i)
                        }
                    },
                    id: 'panel-' + i,
                });
            });
            ScrollTrigger.create({
                start: 0,
                end: 'max',
                snap: 1 / (panels.length - 1),
            });
        },
        { scope: main }
    );
    useEffect(() => {
        const panels = gsap.utils.toArray('.panel');
        let currentSection = -1; // 储存当前section索引

        // 创建ScrollTrigger实例
        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: (panel as any),
                start: 'top center',
                end: 'bottom center',
                onEnter: () => updateCurrentSection(i),
                onLeaveBack: () => updateCurrentSection(i - 1),
            });
        });

        // 更新当前section的函数
        function updateCurrentSection(index: number) {
            currentSection = index;
            // 可在此处进行其他检查或执行相关动作
            if (currentSection === 0) {
                setIsFontState(true)
                ScrollTrigger.disable()
            } else {
                ScrollTrigger.enable()
                setIsFontState(false)

            }
            console.log('当前section索引:', currentSection);
        }
    }, [])
    const goToSection = contextSafe((i: any) => {
        scrollTween.current = gsap.to(window, {
            scrollTo: { y: i * window.innerHeight, autoKill: false },
            duration: 1,
            id: 'scrollTween',
            onComplete: () => (scrollTween.current = null),
            overwrite: true,
        });
    });

    return (
        <Container>
            <main ref={main}>
                <section id='panel-0' className="panel light panel-one">
                    <div className="video-background">
                        <video autoPlay loop muted playsInline >
                            <source src="http://www.feedmusic.com/videos/intro.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <FontView onStateFont={setIsFontState} />
                </section>
                <section id='panel-1' className="panel dark">TWO</section>
            </main>
        </Container>

    );
}
export default useHome