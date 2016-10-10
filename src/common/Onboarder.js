import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';

const Page = ({ width, height, children }) => (
  <View style={{ width, height }}>
    {children}
  </View>
);

const PageContent = ({ children }) => (
  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ flex: 0 }}>
      {children}
    </View>
  </View>
);

const PageData = ({ image, title, subtitle, ...rest }) => (
  <Page {...rest}>
    <PageContent>
      <View style={{ flex: 0, paddingBottom: 60, alignItems: 'center' }}>
        {image}
      </View>
      <Text style={{ textAlign: 'center', fontSize: 26, color: "#fff", paddingBottom: 15 }}>
        {title}
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: "rgba(255, 255, 255, 0.7)" }}>
        {subtitle}
      </Text>
    </PageContent>
  </Page>
);

const PageDot = ({ selected }) => (
  <View
    style={{ width: 6, height: 6, borderRadius: 3, marginHorizontal: 3, backgroundColor: selected ? '#fff' : 'rgba(255, 255, 255, 0.5)' }}
  />
);

const PageDots = ({ pages, currentPage }) => (
  <View style={{ flex: 0, flexDirection: 'row' }}>
    {Array.from(new Array(pages), (x, i) => i).map(page => (
      <PageDot
        key={page}
        selected={page === currentPage}
      />
    ))}
  </View>
);

const ArrowButton = ({ size, onPress }) => (
  <View style={{ height: size, width: size, borderRadius: size / 2, justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.10)' }}>
    <TouchableOpacity style={{ flex: 0 }} onPress={onPress}>
      <Text style={{ textAlign: 'center', color: '#fff', fontSize: size / 1.7 }}>→</Text>
    </TouchableOpacity>
  </View>
);

const Paging = ({ pages, currentPage, onEnd }) => (
  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ width: 70 }} />
    <PageDots pages={pages} currentPage={currentPage} />
    <View style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}>
      {currentPage + 1 === pages ? (
        <ArrowButton size={40} onPress={onEnd} />
      ) : null}
    </View>
  </View>
);

export default class Onboarder extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  updatePosition = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageFraction = contentOffset.x / layoutMeasurement.width;
    const page = Math.round(pageFraction);
    const isLastPage = this.props.pages.length === page + 1;
    if (isLastPage && pageFraction - page > 0.3) {
      this.props.onEnd();
    } else {
      this.setState({ currentPage: page });
    }
  };

  render() {
    const { width, height } = Dimensions.get('window');
    const currentPage = this.props.pages[this.state.currentPage] || this.props.pages[0];

    return (
      <View style={{ flex: 1, backgroundColor: currentPage.backgroundColor, justifyContent: 'center' }}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.updatePosition}
          scrollEventThrottle={100}
        >
          {this.props.pages.map(({ image, title, subtitle }, idx) => (
            <PageData key={idx} image={image} title={title} subtitle={subtitle} width={width} height={height} />
          ))}
        </ScrollView>
        <Paging pages={this.props.pages.length} currentPage={this.state.currentPage} onEnd={this.props.onEnd}/>
      </View>
    );
  }
}

