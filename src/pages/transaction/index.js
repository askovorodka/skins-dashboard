import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '../../modules/loader'
import * as Actions from './actions'
import { ItemModal } from './itemModal'
import { modal } from 'react-redux-modal'
import { translate } from 'react-i18next'
import i18n from '../../i18n';
import './index.scss'

class Transaction extends React.Component {
  constructor () {
    super()
  }

  addModal (item) {
    modal.add(ItemModal, {
      size: 'medium',
      closeOnOutsideClick: true,
      hideTitleBar: true,
      hideCloseButton: false,
      item: item
    })
  }

  render () {
    const it = this.props.transaction

    if (Object.keys(it).length != 0) {
      const price = (it.currency == 'RUB') ? it.value + ' Р' : '$' + it.value

      const status = (it.status == 'completed') ? this.props.t('completed') :
          (it.status == 'error_inventory' || it.status == 'error_bot' || it.status == 'error_pushback') ? this.props.t('error_bot')
          : this.props.t('pending')

      const statusS = {
        color: (it.status == 'completed') ? '#67af55' : (it.status == 'error_inventory' || it.status == 'error_bot' || it.status == 'error_pushback') ? '#c01f36'
          : '#edb140'
      }

      const note = (it.note !== null) ? <div className="trans_it_note">
        <div className="trans_it_note_zag">{this.props.t('note')}</div>
        <div className="trans_it_note_text">{it.note}</div>
      </div>
        : null

      return (
        <div className="trans_it">
          <div className="trans_it_zag">{this.props.t('transaction_information')}</div>
          <div className="trans_it_params">
            <div>
              <div>{this.props.t('transaction_sum')}</div>
              <div>{price}</div>
            </div>
            <div>
              <div>{this.props.t('transaction_number')}</div>
              <div>{it.trade_hash}</div>
            </div>
            <div>
              <div>{this.props.t('transaction_status')}</div>
              <div style={statusS}>{status}</div>
            </div>
            <div>
              <div>{this.props.t('transaction_date')}</div>
              <div>{moment().locale(i18n.language).format('DD MMMM YYYY')}</div>
            </div>
            <div>
              <div>ID</div>
              <div>{it.id}</div>
            </div>
            <div>
              <div>ORDER ID</div>
              <div>{it.order_id}</div>
            </div>
            <div>
              <div>STEAM ID</div>
              <div>{it.steam_id === null ? '----' : it.steam_id}</div>
            </div>
            <div>
              <div>TRADE OFFER ID</div>
              <div>{it.trade_offer_id}</div>
            </div>
          </div>
          {note}
          <div className="trans_it_elems">
            <div className="trans_it_elems_zag">{Object.keys(it.items).length} <span>{this.props.t('transaction_items')}</span></div>
            <div className="trans_it_elems_its">
              {Object.keys(it.items).map(key => (
                <div className="trans_it_elems_its_i" key={key} onClick={e => this.addModal(it.items[key])}>
                  <div className="trans_it_elems_its_i_name">{it.items[key].market_name}</div>
                  <div className={'trans_it_elems_its_i_circle trans_it_elems_its_i_circle-' + it.items[key].type}></div>
                  <img className="trans_it_elems_its_i_img" src={it.items[key].icon_url}/>
                  <div className="trans_it_elems_its_i_price">{it.items[key].price_raw} Р</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Loader />
      )
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.actions.getTransaction(this.props.token, id)
  }

  componentWillUnmount () {
    this.props.actions.clearTransaction()
  }

}

export default connect(
  state => ({
    transaction: state.transaction,
    transactions: state.transactions
  }),
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(translate(['transaction'])(Transaction))
