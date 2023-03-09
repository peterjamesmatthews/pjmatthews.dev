use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[allow(non_snake_case)]
pub fn calculateCount(count: i32) -> i32 {
    count + 1
}

#[cfg(test)]
mod tests {
    use crate::calculateCount;

    #[test]
    fn one_plus_one() {
        assert_eq!(calculateCount(1), 2);
    }

    #[test]
    fn zero_plus_one() {
        assert_eq!(calculateCount(0), 1);
    }

    #[test]
    fn negative_one_plus_one() {
        assert_eq!(calculateCount(-1), 0);
    }
}
