export default function (app: any) {
    const DISTANCE = 150;
    const DURATION = 500;
    const map = new WeakMap();
    const ob = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                if (entry.isIntersecting) {
                    const animation = map.get(entry.target);
                    if (animation) {
                        animation.play();
                        ob.unobserve(entry.target);
                    }
                }
            }
        }
    });
    const isBelowViewport = (el: any) => {
        const rect = el.getBoundingClientRect();
        return rect.top - DISTANCE > window.innerHeight;
    };
    app.directive('slid', {
        mounted(el) {
            if (!isBelowViewport(el)) {
                return;
            }
            const animation = el.animate(
                [
                    {
                        transform: `translateY(${DISTANCE}px)`,
                        opacity: 0.1,
                    },
                    {
                        transform: `translateY(0)`,
                        opacity: 1,
                    },
                ],
                {
                    duration: DURATION,
                    easing: "ease-in-out",
                    fill: "forwards",
                }
            );
            animation.pause();
            ob.observe(el);
            map.set(el, animation)
        },
        unmounted(el) {
            ob.unobserve(el);
        },
    })
}

