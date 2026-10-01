import './ScrollToTop.scss'
import Icon from '../Icon/Icon'
import { useScrollToTop } from './useScrollToTop.web'

export default function ScrollToTop() {
  const { visible, buttonRef, overPricing, scrollToTop } = useScrollToTop()

  return (
    <button
      type={`button`}
      ref={buttonRef}
      disabled={!visible}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      id={`scroll-to-top`}
      title={`Scroll to top`}
      aria-label={`Scroll to top`}
      className={`site-header__icon-button site-header__icon-button--primary scroll-to-top${visible ? ` scroll-to-top--visible` : ``}${overPricing ? ` scroll-to-top--over-pricing` : ``}`}
    >
      <Icon
        size={18}
        strokeWidth={2.4}
        name={`chevron-up`}
        id={`scroll-to-top-icon`}
        className={`scroll-to-top__icon`}
      />
    </button>
  )
}
