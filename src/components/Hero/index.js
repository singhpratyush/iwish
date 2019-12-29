import React from 'react';
import uikitStyles from '../../utils/uikitStyles';
import heroImg from './img/hero.svg'
import styles from './css/style.css'

const index = () => {
  return (
    <div style={{ margin: '32px 0 40px 0' }}
      className={[styles.heroContainer, uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
      <div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l']].join(' ')}>
        <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-bottom'], uikitStyles['uk-flex-row']].join(' ')}>
          <img className={[uikitStyles['uk-visible@s'], uikitStyles['uk-margin-medium-right']].join(' ')} src={heroImg} alt="Hero" />
          <div>
            <h3>Everything starts with a wish. What’s your wish?</h3>
            <p>One day someone wished for a connected world. And today we’ve Internet. One day someone wished for pineapple pizza. Well, let’s not talk about that.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;