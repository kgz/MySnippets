abstract class memLog{
	private static $last = 0;
	public static $fn =  "_memory_usage.txt";

	public static function log(){
		$bt=debug_backtrace();
		// time('now')
		$caller = array_shift($bt);
		$diff = self::format_bytes(memory_get_usage() - self::$last);
		self::$last = memory_get_usage();
		$now = new DateTime('now');
		$out = [
			//now formatted
			$now->format('Y-m-d H:i:s'),
			'Line: ' .$caller['line'],
			'End usage: ' . str_pad(self::format_bytes(memory_get_usage()), 10, ' ', STR_PAD_LEFT),
			'Diff: ' . str_pad($diff, 10, ' ', STR_PAD_LEFT),
			'Peak usage: ' . self::format_bytes(memory_get_peak_usage()),
			'Peak usage real: ' . self::format_bytes(memory_get_peak_usage(true)),
		];
		file_put_contents(self::$fn, implode("\t\t", $out) . "\n", FILE_APPEND);
	}

	public static function format_bytes($bytes, $precision = 2) {
		$units = array('B', 'KB', 'MB', 'GB', 'TB'); 
	
		$bytes = max($bytes, 0); 
		$pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
		$pow = min($pow, count($units) - 1); 
	
		// Uncomment one of the following alternatives
		$bytes /= pow(1024, $pow);
		// $bytes /= (1 << (10 * $pow)); 
	
		return round($bytes, $precision) . ' ' . $units[$pow]; 
		
	}

}
