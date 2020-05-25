import {Component, ComponentInterface, h, Prop, State} from '@stencil/core';
import {SearchBox, SearchBoxState, SearchBoxOptions} from '@coveo/headless';
import {headlessEngine} from '../../engine';

@Component({
  tag: 'atomic-search-box',
  styleUrl: 'atomic-search-box.css',
  shadow: true,
})
export class AtomicSearchBox implements ComponentInterface {
  @Prop() isStandalone = false;

  @Prop() numberOfSuggestions = 5;

  @State() searchBoxState!: SearchBoxState;

  private searchBox!: SearchBox;

  componentWillLoad() {
    this.searchBox = new SearchBox(headlessEngine, this.options);

    this.updateState();
    this.searchBox.subscribe(() => this.updateState());
  }

  componentShouldUpdate(newState: SearchBoxState, oldState: SearchBoxState) {
    // Stencil re-renders whenever the state is updated, checking for state changes prevent rerenders
    return JSON.stringify(newState) !== JSON.stringify(oldState);
  }

  componentDidUpdate() {
    if (this.searchBoxState.redirectTo) {
      window.location.assign(this.searchBoxState.redirectTo);
    }
  }

  private get options(): Partial<SearchBoxOptions> {
    return {
      isStandalone: this.isStandalone,
      numberOfSuggestions: this.numberOfSuggestions,
    };
  }

  private updateState() {
    this.searchBoxState = this.searchBox.state;
  }

  private onInputChange(e: KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.searchBox.updateText({value});
  }

  private onInputBlur() {
    setTimeout(() => this.searchBox.hideSuggestions(), 100);
  }

  private clear() {
    this.searchBox.clear();
  }

  private onClickSuggestion(e: MouseEvent) {
    const value = (e.target as HTMLElement).innerText;
    this.searchBox.selectSuggestion({value});
  }

  suggestions() {
    return this.searchBoxState.suggestions.map((suggestion) => (
      <li onClick={(e) => this.onClickSuggestion(e)}>{suggestion.value}</li>
    ));
  }

  render() {
    return (
      <div>
        <input
          value={this.searchBoxState.value}
          onInput={(e) => this.onInputChange(e as KeyboardEvent)}
          onFocus={() => this.searchBox.showSuggestions()}
          onBlur={() => this.onInputBlur()}
        />
        <button onClick={() => this.clear()}>Clear</button>
        <button onClick={() => this.searchBox.submit()}>Search</button>
        <ul>{this.suggestions()}</ul>
      </div>
    );
  }
}
