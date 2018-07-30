/**
 * Created by andriantosg on 6/2/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';

class LoadingIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dot1ScaleValue: new Animated.Value(0.01),
      dot2ScaleValue: new Animated.Value(0.01),
      dot3ScaleValue: new Animated.Value(0.01),
      backgroundColor: this.props.dotColor,
    };
    this.runAnimation = this.runAnimation.bind(this);
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.dot1ScaleValue, {
          toValue: 1,
          duration: 500,
        }),
        Animated.timing(this.state.dot3ScaleValue, {
          toValue: 0.01,
          duration: 500,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.dot1ScaleValue, {
          toValue: 0.01,
          duration: 500,
        }),
        Animated.timing(this.state.dot2ScaleValue, {
          toValue: 1,
          duration: 500,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.dot2ScaleValue, {
          toValue: 0.01,
          duration: 500,
        }),
        Animated.timing(this.state.dot3ScaleValue, {
          toValue: 1,
          duration: 500,
        }),
      ]),
    ]).start(event => {
      if (event.finished) {
        this.runAnimation();
      }
    });
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: this.props.alignTo !== null ? this.props.alignTo : 'center',
        }}
      >
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: this.state.dot1ScaleValue }],
              backgroundColor: this.state.backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: this.state.dot2ScaleValue }],
              backgroundColor: this.state.backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [{ scale: this.state.dot3ScaleValue }],
              backgroundColor: this.state.backgroundColor,
            },
          ]}
        />
      </View>
    );
  }
}

LoadingIndicator.propTypes = {
  dotColor: PropTypes.string.isRequired,
  alignTo: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  dotColor: '#1ba0e2',
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 1,
  },
});

export default LoadingIndicator;
