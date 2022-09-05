private function generateTinyid($uuid)
	{
		$reduce = function($n, $max) {
			// Nothing to do
			if ($n <= $max) {
				return $n;
			}

			$sum = 0;

			// Add all individual digits together
			do {
				$sum += $n % 10;
			} while ($n = (int) $n / 10);

			// Reduce by adding last digit to leading number
			while ($sum > $max) {
				$sum = floor($sum / 10) + ($sum % 10);
			}

			return max(1, $sum);
		}; // function $reduce();

		$chunks = str_split(str_replace('-', '', $uuid), 8);
		foreach ($chunks as $k => $chunk) {
			// Reduce hex chunk to number between 0 and 26 or 36
			$n = $reduce(hexdec($chunk), ($k ? 36 : 26) + 1) - 1;

			// 36 - $n because conversion charset starts with numbers
			$chunks[$k] = strtoupper(base_convert(36 - $n, 10, 36));
		}

		return implode('', $chunks);
	} // function generateTinyid();
