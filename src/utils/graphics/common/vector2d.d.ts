interface coord {
  x: number;
  y: number;
}
export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super(x, y);
  }

  set x(v: number) {
    this[0] = v;
  }

  set y(v: number) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  // 长度
  get length() {
    return Math.hypot(this.x, this.y);
  }

  // 角度
  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  // 正向位移
  add(v: coord) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  // 负向位移
  sub(v: coord) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  // 缩放
  scale(val: number) {
    this.x *= val;
    this.y *= val;
    return this;
  }

  // 叉乘
  corss(v: coord) {
    return this.x * v.y - v.x * this.y;
  }

  // 点乘
  dot(v: coord) {
    return this.x * v.x + this.y * v.y;
  }

  normalize() {
    this.scale(1 / this.length);
  }

  // 这个rotate函数意思是：在原来角度的基础上，再旋转rad角度。 比如：
  //  原来是 sin(oldRad) ，现在是sin(oldRad + rad);
  //  原来是 cos(oldRad)，现在是cos(oldRad + rad);
  //  根据三角函数和差运算公式：
  //  因为 cos(oldRad) 、sin(oldRad)是向量 P 原始的坐标 x、y，所以 cos(oldRad) = x; sin(oldRad) = y;
  //  那么 this.x = x * c - y * s;
  //  就可以理解为
  //  newX = cos(oldRad+rad) = cos(oldRad)*cos(rad) - sin(oldRad)*sin(rad) = x*cos(rad) - y*sin(rad)
  //  而 this.y = x * s + y * c;
  // 就可以理解为 newY = sin(oldRad+rad) = sin(oldRad)*cos(rad) + cos(oldRad)*sin(rad) = y*cos(rad) + x*sin(rad)
  rotate(rad: number) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const [x, y] = this;
    this.x = x * c + y * -s;
    this.y = x * s + y * c;
    return this;
  }
}
