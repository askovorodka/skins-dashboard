import Item from './item.js'
import { Scrollbars } from 'react-custom-scrollbars'
import './index.scss'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import i18n from '../../i18n';

class Faq extends React.Component {
	constructor() {
		super();
	}

	renderIts() {
		const its = this.items.map((it, index) =>
			<Item key={index} data={it}/>
		)
		return its;
	}

	render() {

        try {
            switch (i18n.language) {
                default:
                    this.markdown = require('raw-loader!./description-ru.md');
                    break;
                case 'en':
                    this.markdown = require('raw-loader!./description-en.md');
                    break;
                case 'cn':
                    this.markdown = require('raw-loader!./description-cn.md');
                    break;
            }

        } catch (Error) {
            console.log(error.toString());
            this.markdown = '';
        }

        this.items = [
            {
                queston: this.props.t('question0'),
                answer: this.props.t('answer0'),
            },
            {
                queston: this.props.t('question1'),
                answer: this.props.t('answer1'),
            },
            {
                queston: this.props.t('question2'),
                answer: this.props.t('answer2'),
            },
            {
                queston: this.props.t('question3'),
                answer: this.props.t('answer3'),
            },
        ];

        return (
			<Scrollbars>
				<div className="faq">
					{this.items.map((it, index) =>
						<Item key={index} data={it}/>
					)}
				</div>
			</Scrollbars>
		);
	}
}

export default connect()(translate(['faq'])(Faq))
