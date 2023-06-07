<template>
    <component :is="tagName">
        <transition :name="transition" :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass"
                    @after-leave="doDestroy">
      <span
          ref="popper"
          :class="rootClass"
          v-show="!disabled && showPopper">
        <slot>{{ content }}</slot>
      </span>
        </transition>
        <slot name="reference"></slot>
    </component>
</template>

<script>
import Popper from 'popper.js';
import handleEvent from "../utils/handleEvent";


export default {
    props: {
        tagName: {
            type: String,
            default: 'span',
        },
        trigger: {
            type: String,
            default: 'hover',
            validator: value => [
                'clickToOpen',
                'click', // Same as clickToToggle, provided for backwards compatibility.
                'clickToToggle',
                'hover',
                'focus',
                'manual'
            ].indexOf(value) > -1
        },
        delayOnMouseOver: {
            type: Number,
            default: 10,
        },
        delayOnMouseOut: {
            type: Number,
            default: 10,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        content: String,
        enterActiveClass: String,
        leaveActiveClass: String,
        boundariesSelector: String,
        reference: {},
        forceShow: {
            type: Boolean,
            default: false
        },
        dataValue: {
            default: null,
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        visibleArrow: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: ''
        },
        stopPropagation: {
            type: Boolean,
            default: false
        },
        preventDefault: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        rootClass: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            referenceElm: null,
            popperJS: null,
            showPopper: false,
            currentPlacement: '',
            popperOptions: {
                placement: 'bottom',
                computeStyle: {
                    gpuAcceleration: false
                }
            }
        };
    },

    watch: {
        showPopper(value) {
            if (value) {
                this.$emit('show', this);
                if (this.popperJS) {
                    this.popperJS.enableEventListeners();
                }
                this.updatePopper();
            } else {
                if (this.popperJS) {
                    this.popperJS.disableEventListeners();
                }
                this.$emit('hide', this);
            }
        },

        forceShow: {
            handler(value) {
                this[value ? 'doShow' : 'doClose']();
            },
            immediate: true
        },

        disabled(value) {
            if (value) {
                this.showPopper = false;
            }
        }
    },

    created() {
        this.appendedArrow = false;
        this.appendedToBody = false;
        this.popperOptions = Object.assign(this.popperOptions, this.options);
    },

    mounted() {
        this.referenceElm = this.reference || this.$slots.reference[0].elm;
        if (this.$slots.default[0].tag === undefined) {
            this.popper = this.$slots.default[0].elm.nextSibling;
        } else {
            this.popper = this.$slots.default[0].elm;

        }

        switch (this.trigger) {
            case 'clickToOpen':
                handleEvent.on(this.referenceElm, 'click', this.doShow);
                handleEvent.on(document, 'click', this.handleDocumentClick);
                break;
            case 'click': // Same as clickToToggle, provided for backwards compatibility.
            case 'clickToToggle':
                handleEvent.on(this.referenceElm, 'click', this.doToggle);
                handleEvent.on(document, 'click', this.handleDocumentClick);
                break;
            case 'hover':
                handleEvent.on(this.referenceElm, 'mouseover', this.onMouseOver);
                handleEvent.on(this.popper, 'mouseover', this.onMouseOver);
                handleEvent.on(this.referenceElm, 'mouseout', this.onMouseOut);
                handleEvent.on(this.popper, 'mouseout', this.onMouseOut);
                break;
            case 'focus':
                handleEvent.on(this.referenceElm, 'mousedown', this.onMouseOver);
                handleEvent.on(this.popper, 'mousedown', this.onMouseOver);
                handleEvent.on(this.referenceElm, 'mouseup', this.onMouseOut);
                handleEvent.on(this.popper, 'mouseup', this.onMouseOut);
                break;
            case 'manual':
                handleEvent.on(this.referenceElm, 'click', this.doToggle);
                break;
        }
    },

    methods: {
        doToggle(event) {
            if (this.stopPropagation) {
                event.stopPropagation();
            }

            if (this.preventDefault) {
                event.preventDefault();
            }

            if (!this.forceShow) {
                this.showPopper = !this.showPopper;
            }
        },

        doShow() {
            this.showPopper = true;
        },

        doClose() {
            this.showPopper = false;
        },

        doDestroy() {
            if (this.showPopper) {
                return;
            }

            if (this.popperJS) {
                this.popperJS.destroy();
                this.popperJS = null;
            }

            if (this.appendedToBody) {
                this.appendedToBody = false;
                document.body.removeChild(this.popper.parentElement);
            }
        },

        createPopper() {
            this.$nextTick(() => {
                if (this.visibleArrow) {
                    this.appendArrow(this.popper);
                }

                if (this.appendToBody && !this.appendedToBody) {
                    this.appendedToBody = true;
                    document.body.appendChild(this.popper.parentElement);
                }

                if (this.popperJS && this.popperJS.destroy) {
                    this.popperJS.destroy();
                }

                if (this.boundariesSelector) {
                    const boundariesElement = document.querySelector(this.boundariesSelector);

                    if (boundariesElement) {
                        this.popperOptions.modifiers = Object.assign({}, this.popperOptions.modifiers);
                        this.popperOptions.modifiers.preventOverflow = Object.assign({}, this.popperOptions.modifiers.preventOverflow);
                        this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
                    }
                }

                this.popperOptions.onCreate = () => {
                    this.$emit('created', this);
                    this.$nextTick(this.updatePopper);
                };

                this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions);
            });
        },

        destroyPopper() {
            handleEvent.off(this.referenceElm, 'click', this.doToggle);
            handleEvent.off(this.referenceElm, 'mouseup', this.doClose);
            handleEvent.off(this.referenceElm, 'mousedown', this.doShow);
            handleEvent.off(this.referenceElm, 'focus', this.doShow);
            handleEvent.off(this.referenceElm, 'blur', this.doClose);
            handleEvent.off(this.referenceElm, 'mouseout', this.onMouseOut);
            handleEvent.off(this.referenceElm, 'mouseover', this.onMouseOver);
            handleEvent.off(document, 'click', this.handleDocumentClick);

            this.showPopper = false;
            this.doDestroy();
        },

        appendArrow(element) {
            if (this.appendedArrow) {
                return;
            }

            this.appendedArrow = true;

            const arrow = document.createElement('div');
            arrow.setAttribute('x-arrow', '');
            arrow.className = 'popper__arrow';
            element.appendChild(arrow);
        },

        updatePopper() {
            this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
        },

        onMouseOver() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.showPopper = true;
            }, this.delayOnMouseOver);
        },

        onMouseOut() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.showPopper = false;
            }, this.delayOnMouseOut);
        },

        handleDocumentClick(e) {
            if (!this.$el || !this.referenceElm ||
                this.elementContains(this.$el, e.target) ||
                this.elementContains(this.referenceElm, e.target) ||
                !this.popper || this.elementContains(this.popper, e.target)
            ) {
                return;
            }

            this.$emit('documentClick', this);

            if (this.forceShow) {
                return;
            }

            this.showPopper = false;
        },

        elementContains(elm, otherElm) {
            if (typeof elm.contains === 'function') {
                return elm.contains(otherElm);
            }

            return false;
        }
    },

    destroyed() {
        this.destroyPopper();
    }
}
</script>
