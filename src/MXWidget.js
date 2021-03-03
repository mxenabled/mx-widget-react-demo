import React from 'react'
import PropTypes from 'prop-types'

/**
 * Basic React example for embedding MX Widgets into a React application
 */
export class MXWidget extends React.Component {
  static propTypes = {
    /**
     * This callback simply abstracts over post messages, making them a little
     * easier to work with
     */
    onEvent: PropTypes.func,
    // This is the one time use widget URL
    url: PropTypes.string.isRequired,
  }

  static defaultProps = {
    /**
     * Handling events isn't required, but recommended for a successful
     * connect integration.
     */
    onEvent: () => {},
  }

  componentDidMount() {
    // Add the post message listener
    window.addEventListener('message', this.onPostMessage);
  }

  componentWillUnmount() {
    // Make sure to remove the post message listener to avoid multiple messages
    window.removeEventListener('message', this.onPostMessage);
  }

  /**
   * Handle MX Postmessages and call the event callback with the payload.
   * NOTE: this only looks for post messages with `ui_message_version: 4`
   */
  onPostMessage = event => {
    if (event.data && event.data.mx === true) {
      this.props.onEvent(event.data)
    }
  }

  /**
   * Render a basic iframe. You'll want to customize the values here to best
   * fit your own app.
   */
  render() {
    return (
      <iframe
        border={'0'}
        frame={'0'}
        frameBorder={'0'}
        height={500}
        marginHeight={'0'}
        marginWidth={'0'}
        src={this.props.url}
        title={'MX Widget'}
        width={500}
      />
    )
  }
}
